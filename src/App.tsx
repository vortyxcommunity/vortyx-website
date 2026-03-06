import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download, Smartphone, Shield, Zap, Users, MessageSquare,
  Star, Lock, UserPlus, SquarePlus, Check, X,
  Mail, Crown, Ghost, Zap as ZapIcon, Heart, ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [roleColor, setRoleColor] = useState('#2563eb');
  const [roleIcon, setRoleIcon] = useState('ShieldCheck');

  const icons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck size={18} />,
    Crown: <Crown size={18} />,
    Ghost: <Ghost size={18} />,
    ZapIcon: <ZapIcon size={18} />,
    Heart: <Heart size={18} />
  };

  return (
    <div className="app-wrapper">
      <div className="bg-gradient" />
      <div className="glow-orb" style={{ top: '10%', left: '10%' }} />
      <div className="glow-orb" style={{ bottom: '10%', right: '10%', background: '#1e40af' }} />

      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/vortyx-logo.png" alt="" style={{ width: '2rem', height: '2rem' }} />
            VORTYX<span>.</span>
          </div>
          <div className="hero-btns" style={{ marginTop: 0 }}>
            <a href="#features" className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Features</a>
            <a href="https://github.com/vortyxcommunity/vortyx-pc-app/releases" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Download</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="gradient-text text-glow">The Future of Digital Identity.</h1>
                <p>Experience a new era of communication where your identity is truly yours. Premium features, custom roles, and advanced security.</p>

                <div className="hero-btns">
                  <a href="https://github.com/vortyxcommunity/vortyx-pc-app/releases" className="btn-primary">
                    <Download className="w-5 h-5" /> Download for Windows
                  </a>
                  <a href="#" className="btn-secondary">
                    <Smartphone className="w-5 h-5" /> Android (Coming Soon)
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="mockup-container"
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: -15 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <img src="/vortyx-mockup.png" alt="Vortyx UI Mockup" className="mockup-img" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Identity Playground */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center' }}
            >
              <h2 className="gradient-text">Design Your Identity</h2>
              <p style={{ margin: '0 auto 4rem' }}>Vortyx gives you total control over how you appear. Pick your colors, pick your status, be unique.</p>

              <div className="glass-card playground-card">
                <h3 style={{ marginBottom: '2rem' }}>Role Preview</h3>
                <div className="role-preview" style={{ color: roleColor, borderColor: `${roleColor}44` }}>
                  {icons[roleIcon]}
                  <span>Pro Member</span>
                </div>

                <div className="color-picker">
                  {['#2563eb', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'].map(color => (
                    <div
                      key={color}
                      className={`color-dot ${roleColor === color ? 'active' : ''}`}
                      style={{ background: color }}
                      onClick={() => setRoleColor(color)}
                    />
                  ))}
                </div>

                <div className="icon-selector">
                  {Object.keys(icons).map(iconName => (
                    <div
                      key={iconName}
                      className={`icon-btn ${roleIcon === iconName ? 'active' : ''}`}
                      onClick={() => setRoleIcon(iconName)}
                    >
                      {icons[iconName]}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comparison Section */}
        <section>
          <div className="container">
            <h2 className="gradient-text">Why Choose Vortyx?</h2>
            <div className="comparison-container">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th style={{ color: 'var(--primary)' }}>Vortyx</th>
                    <th>Legacy Apps</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: 'End-to-End Encryption', v: true, o: false },
                    { f: 'Custom Role Identity', v: true, o: false },
                    { f: 'Zero Ads & Data Selling', v: true, o: false },
                    { f: 'Ultra-Low Latency Voice', v: true, o: true },
                    { f: 'Full Privacy Control', v: true, o: false },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>{row.f}</td>
                      <td>{row.v ? <Check className="check" /> : <X className="cross" />}</td>
                      <td>{row.o ? <Check className="check" /> : <X className="cross" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="gradient-text">Everything you need,<span> nothing you don't.</span></h2>
            </motion.div>

            <div className="features-grid">
              {[
                { icon: <Shield />, title: 'Advanced Security', desc: 'Enterprise-grade encryption for all your conversations and data.' },
                { icon: <Zap />, title: 'Hyper Performance', desc: 'Built for speed. No lag, no bloat, just pure performance.' },
                { icon: <Users />, title: 'Custom Identities', desc: 'Unique roles, custom icons, and vibrant colors to express yourself.' },
                { icon: <MessageSquare />, title: 'Rich Media', desc: 'Full support for high-quality audio, video, and file sharing.' },
                { icon: <Star />, title: 'Pro Experience', desc: 'A meticulously designed UI that feels premium in every interaction.' },
                { icon: <Lock />, title: 'Private Servers', desc: 'Create your own secure space with PIN protection and role permissions.' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>{feature.title}</h3>
                  <p style={{ fontSize: '1rem' }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section id="getting-started" style={{ background: 'rgba(37, 99, 235, 0.02)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h2 className="gradient-text">Start Your Journey in Minutes</h2>
              <p style={{ margin: '0 auto' }}>Follow these simple steps to set up your Vortyx experience and connect with your community.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {[
                { step: '01', icon: <Download />, title: 'Download & Install', desc: 'Grab the latest Windows installer and run it on your PC. The app will automatically set up everything for you.' },
                { step: '02', icon: <UserPlus />, title: 'Create Your Account', desc: 'Securely register using your email. Customize your profile with a unique avatar and username.' },
                { step: '03', icon: <SquarePlus />, title: 'Launch Your Space', desc: 'Click the "+" icon in the server sidebar to create your own server. Choose your theme and visibility.' },
                { step: '04', icon: <MessageSquare />, title: 'Start Connecting', desc: 'Create channels, invite your friends with a code, and experience the next level of private chat.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ position: 'relative' }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '2rem',
                    fontSize: '3rem',
                    fontWeight: 900,
                    opacity: 0.05,
                    color: 'white'
                  }}>
                    {item.step}
                  </span>
                  <div className="feature-icon">{item.icon}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section>
          <div className="container" style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: '5rem 2rem' }}
            >
              <Mail className="w-12 h-12" style={{ margin: '0 auto 2rem', color: 'var(--primary)' }} />
              <h2 className="gradient-text">Stay in the Loop</h2>
              <p style={{ margin: '0 auto' }}>Get notified about new features, Android launch, and official community events.</p>

              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                <button type="submit" className="btn-primary">Join Now</button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div style={{ maxWidth: '300px' }}>
              <div className="logo" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src="/vortyx-logo.png" alt="" style={{ width: '2rem', height: '2rem' }} />
                VORTYX<span>.</span>
              </div>
              <p style={{ fontSize: '0.9rem' }}>Redefining communication for the modern era. Join the revolution today.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>Product</h4>
              <div className="footer-links">
                <a href="#">Download</a>
                <a href="#features">Features</a>
                <a href="#">Releases</a>
                <a href="#">Security</a>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>Company</h4>
              <div className="footer-links">
                <a href="#">About Us</a>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Branding</a>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>Community</h4>
              <div className="footer-links">
                <a href="mailto:vortyxcommunity@gmail.com">Contact Support</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '0.8rem' }}>&copy; 2026 Vortyx. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
