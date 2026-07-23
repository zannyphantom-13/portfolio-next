'use client';
import { useState, useEffect, useCallback } from 'react';
import { getSupabaseClient } from '../../lib/supabase';
import Image from 'next/image';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;



function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);
    g.gain.setValueAtTime(0.4, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.start(ctx.currentTime);
    o.stop(ctx.currentTime + 0.5);
  } catch {}
}

// ── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ pendingData, onClose, onAction }) {
  const [selected, setSelected] = useState(new Set());

  const toggleAll = (checked) => {
    setSelected(checked ? new Set(pendingData.map((t) => t.id)) : new Set());
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const bulkAct = async (action) => {
    const ids = [...selected];
    if (!ids.length) { alert('Select at least one.'); return; }
    if (action === 'delete' && !confirm(`Delete ${ids.length} testimonial(s)?`)) return;
    await onAction(action, ids);
    setSelected(new Set());
  };

  if (!pendingData.length) {
    return (
      <div className="admin-panel">
        <h4>Pending Testimonials</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No pending testimonials.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h4>Pending Testimonials</h4>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#aaa', fontSize: '0.8rem', cursor: 'pointer' }}>
          <input type="checkbox" onChange={(e) => toggleAll(e.target.checked)} /> Select All
        </label>
        <button className="approve-btn" style={{ background: '#22c55e' }} onClick={() => bulkAct('approve')}>Approve</button>
        <button className="approve-btn" style={{ background: '#f59e0b' }} onClick={() => bulkAct('decline')}>Decline</button>
        <button className="approve-btn" style={{ background: '#ef4444' }} onClick={() => bulkAct('delete')}>Delete</button>
        <button className="approve-btn" style={{ background: '#7f1d1d', marginLeft: 'auto' }}
          onClick={async () => {
            if (!confirm(`Delete ALL ${pendingData.length} pending?`)) return;
            await onAction('delete', pendingData.map((t) => t.id));
          }}>
          Delete All
        </button>
      </div>
      {pendingData.map((t) => (
        <div key={t.id} className="pending-item">
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggleOne(t.id)} style={{ marginTop: 3, cursor: 'pointer' }} />
            <div style={{ flex: 1 }}>
              <strong>{t.author_name || 'Anonymous'}</strong>
              <span style={{ display: 'block', marginTop: 2 }}>{t.text}</span>
              <div style={{ display: 'flex', gap: 6, marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <button className="approve-btn" style={{ background: '#22c55e' }} onClick={() => onAction('approve', [t.id])}>Approve</button>
                <button className="approve-btn" style={{ background: '#f59e0b' }} onClick={() => onAction('decline', [t.id])}>Decline</button>
                <button className="approve-btn" style={{ background: '#ef4444' }} onClick={() => onAction('delete', [t.id])}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Testimonials Component ──────────────────────────────────────────────
export default function Testimonials({ onAdminChange }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimonialText, setTestimonialText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [lastPendingIds, setLastPendingIds] = useState(new Set());

  const sb = getSupabaseClient();

  const fetchApproved = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from('testimonials').select('*').eq('approved', true).order('created_at', { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  }, [sb]);

  const loadPending = useCallback(async () => {
    if (!sb || !isAdmin) return;
    const { data } = await sb.from('testimonials').select('*').eq('approved', false).order('created_at', { ascending: false });
    const newData = data || [];
    const newIds = new Set(newData.map((t) => t.id));

    if (lastPendingIds.size > 0) {
      const hasNew = [...newIds].some((id) => !lastPendingIds.has(id));
      if (hasNew) {
        playNotificationSound();
        // Trigger bell ring via custom event
        window.dispatchEvent(new CustomEvent('bell-ring'));
      }
    }

    setLastPendingIds(newIds);
    setPendingData(newData);
    if (onAdminChange) onAdminChange({ count: newData.length });
  }, [sb, isAdmin, lastPendingIds, onAdminChange]);

  const handleAction = useCallback(async (action, ids) => {
    if (!sb) return;
    for (const id of ids) {
      if (action === 'approve') await sb.from('testimonials').update({ approved: true }).eq('id', id);
      else if (action === 'decline') await sb.from('testimonials').update({ approved: false, declined: true }).eq('id', id);
      else if (action === 'delete') await sb.from('testimonials').delete().eq('id', id);
    }
    await loadPending();
    await fetchApproved();
  }, [sb, loadPending, fetchApproved]);

  // Auth listener
  useEffect(() => {
    if (!sb) { setLoading(false); return; }

    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      const admin = !!(user && user.email === ADMIN_EMAIL);
      setIsAdmin(admin);
      if (onAdminChange) onAdminChange({ isAdmin: admin, count: 0 });
    });

    sb.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user || null;
      setCurrentUser(user);
      const admin = !!(user && user.email === ADMIN_EMAIL);
      setIsAdmin(admin);
      if (onAdminChange) onAdminChange({ isAdmin: admin, count: 0 });
    });

    return () => subscription.unsubscribe();
  }, [sb, onAdminChange]);

  useEffect(() => { fetchApproved(); }, [fetchApproved]);

  useEffect(() => {
    if (isAdmin) loadPending();
  }, [isAdmin, loadPending]);

  // Realtime
  useEffect(() => {
    if (!sb) return;
    const channel = sb.channel('public:testimonials:' + Math.random())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => {
        fetchApproved();
        if (isAdmin) loadPending();
      })
      .subscribe();
    const interval = setInterval(fetchApproved, 10000);
    return () => { sb.removeChannel(channel); clearInterval(interval); };
  }, [sb, isAdmin, fetchApproved, loadPending]);

  const signIn = async () => {
    if (!sb) return;
    await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
  };

  const signOut = async () => {
    if (!sb) return;
    await sb.auth.signOut();
  };

  const submitTestimonial = async (e) => {
    e.preventDefault();
    if (!currentUser || isAdmin || !testimonialText.trim()) return;
    setSubmitting(true);
    try {
      await sb.from('testimonials').insert([{
        text: testimonialText.trim(),
        author_name: currentUser.user_metadata?.full_name || currentUser.email,
        author_photo: currentUser.user_metadata?.avatar_url || '',
        author_uid: currentUser.id,
        approved: false,
      }]);
      setTestimonialText('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      alert('Failed to submit.');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteTestimonial = async (id) => {
    if (!sb || !confirm('Delete this testimonial?')) return;
    await sb.from('testimonials').delete().eq('id', id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Kind Words</span>
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">What clients say after working with me.</p>
        </div>

        {/* Admin panel */}
        {isAdmin && panelOpen && (
          <AdminPanel
            pendingData={pendingData}
            onClose={() => setPanelOpen(false)}
            onAction={handleAction}
          />
        )}

        {/* Testimonials grid */}
        <div className="testimonials-grid">
          {loading && (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1', textAlign: 'center' }}>
              Loading testimonials...
            </p>
          )}
          {!loading && testimonials.length === 0 && (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1', textAlign: 'center' }}>
              No testimonials yet. Be the first!
            </p>
          )}
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <span className="quote-icon"><i className="fas fa-quote-left" /></span>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <Image
                  src={t.author_photo || '/profile.png'}
                  alt={t.author_name || 'Client'}
                  width={36}
                  height={36}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/profile.png'; }}
                />
                <h4 className="client-name">— {t.author_name}</h4>
              </div>
              {currentUser && currentUser.id === t.author_uid && !isAdmin && (
                <button
                  onClick={() => deleteTestimonial(t.id)}
                  style={{
                    background: 'transparent', border: '1px solid #ff4444', color: '#ff4444',
                    padding: '0.2rem 0.5rem', fontSize: '0.8rem', cursor: 'pointer',
                    borderRadius: '4px', marginTop: '1rem', width: '100%', fontFamily: 'inherit'
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Auth */}
        <div className="auth-section">
          {!currentUser && (
            <>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Sign in to leave a testimonial</p>
              <button onClick={signIn} className="btn primary-btn">
                <i className="fab fa-google" /> Sign In with Google
              </button>
            </>
          )}
          {currentUser && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
              <Image
                src={currentUser.user_metadata?.avatar_url || '/profile.png'}
                alt="Profile"
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
              <span style={{ color: '#fff' }}>{currentUser.user_metadata?.full_name || currentUser.email}</span>
              <button onClick={signOut} className="btn secondary-btn" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Submit form */}
        {currentUser && !isAdmin && (
          <div className="add-testimonial-section">
            <form onSubmit={submitTestimonial}>
              <textarea
                value={testimonialText}
                onChange={(e) => setTestimonialText(e.target.value)}
                placeholder="Share your experience working with me..."
                required
              />
              <br />
              <button type="submit" className="btn primary-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Testimonial'}
              </button>
            </form>
            {submitted && (
              <p style={{ color: '#4ade80', marginTop: '1rem' }}>
                <i className="fas fa-check-circle" /> Your testimonial has been submitted for approval!
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
