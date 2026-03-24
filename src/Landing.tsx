import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download, Smartphone, Shield, Zap, Users, MessageSquare,
  Star, Lock, UserPlus, SquarePlus, Check, X,
  Mail, Crown, Ghost, Zap as ZapIcon, Heart, ShieldCheck
} from 'lucide-react';
import { Auth } from './components/Auth';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const [roleColor, setRoleColor] = useState('#2563eb');
  const [roleIcon, setRoleIcon] = useState('ShieldCheck');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const icons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck size={18} />,
    Crown: <Crown size={18} />,
    Ghost: <Ghost size={18} />,
    ZapIcon: <ZapIcon size={18} />,
    Heart: <Heart size={18} />
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Use the GitHub API to get the latest release data
      const response = await fetch('https://api.github.com/repos/vortyxcommunity/VORTYX-COMMUNITY/releases/latest');
      if (!response.ok) throw new Error('Failed to fetch release info');
      
      const data = await response.json();
      // Find the first asset ending in .exe
      const asset = data.assets.find((a: any) => a.name.toLowerCase().endsWith('.exe'));
      
      if (asset && asset.browser_download_url) {
        window.location.href = asset.browser_download_url;
      } else {
        // Fallback to the releases page if no .exe is found
        window.location.href = 'https://github.com/vortyxcommunity/VORTYX-COMMUNITY/releases/latest';
      }
    } catch (error) {
      console.error('Download error:', error);
      // Fallback to the releases page on error
      window.location.href = 'https://github.com/vortyxcommunity/VORTYX-COMMUNITY/releases/latest';
    }
  };

  return (
    <div className="app-wrapper">
      <div className="bg-gradient" />
      <div className="glow-orb" style={{ top: '10%', left: '10%' }} />
      <div className="glow-orb" style={{ bottom: '10%', right: '10%', background: '#1e40af' }} />

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/vortyx-logo.png" alt="" style={{ width: '2rem', height: '2rem' }} />
            VORTYX<span>.</span>
          </div>
          <div className="hero-btns" style={{ marginTop: 0 }}>
            <a href="#features" className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Features</a>
            <button onClick={() => setIsAuthOpen(true)} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Login</button>
            <a href="#" onClick={handleDownload} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Download</a>
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
                <div className="role-preview" style={{ margin: '0 0 2rem 0', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                  <ZapIcon size={14} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text)' }}>Version 2.0.0 is Live</span>
                </div>
                <h1 className="gradient-text text-glow">The Future of Digital Identity.</h1>
                <p>Experience a new era of communication where your identity is truly yours. Premium features, custom roles, and advanced security.</p>

                <div className="hero-btns">
                  <a href="#" onClick={handleDownload} className="btn-primary shine-effect">
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

        {/* Stats Section */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="stats-grid">
              {[
                { number: '10K+', label: 'Active Users' },
                { number: '500+', label: 'Private Servers' },
                { number: '99.9%', label: 'Uptime' },
                { number: '24/7', label: 'Support' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="stat-number gradient-text">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
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
            <div className="text-center" style={{ marginBottom: '4rem' }}>
              <h2 className="gradient-text">Why Choose Vortyx?</h2>
              <p className="m-auto">We're not just another chat app. We're a privacy-first identity platform.</p>
            </div>
            <div className="comparison-container glass-card">
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
                      <td style={{ fontWeight: 600 }}>{row.f}</td>
                      <td>{row.v ? <Check className="check" /> : <X className="cross" />}</td>
                      <td>{row.o ? <Check className="check" /> : <X className="cross" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '4rem' }}>
              <h2 className="gradient-text">Loved by Communities</h2>
              <p className="m-auto">Hear from users who have already made the switch to Vortyx.</p>
            </div>
            <div className="testimonials-grid">
              {[
                { name: 'Alex Rivera', role: 'Dev Lead', quote: 'The identity customization in Vortyx is unlike anything I\'ve seen. It actually feels personal.', avatar: 'https://i.pravatar.cc/150?u=alex' },
                { name: 'Sarah Chen', role: 'Community Mod', quote: 'Security is our top priority, and Vortyx delivers enterprise-grade encryption without the bloat.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
                { name: 'Marcus Thorne', role: 'Gamer', quote: 'Zero lag voice chat and 4K screen sharing. This is the new standard for our raid nights.', avatar: 'https://i.pravatar.cc/150?u=marcus' },
              ].map((t, i) => (
                <motion.div 
                  key={i} 
                  className="glass-card testimonial-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="testimonial-header">
                    <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                    <div className="testimonial-author">
                      <h4>{t.name}</h4>
                      <span>{t.role}</span>
                    </div>
                  </div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                </motion.div>
              ))}
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
              style={{ textAlign: 'center' }}
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
                  className="glass-card shine-effect"
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
                  {i === 0 && (
                    <a href="#" onClick={handleDownload} className="btn-primary" style={{ marginTop: '1rem', width: 'fit-content', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                      Download Now
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <div className="container">
            <div className="text-center" style={{ marginBottom: '4rem' }}>
              <h2 className="gradient-text">Frequently Asked Questions</h2>
              <p className="m-auto">Everything you need to know about Vortyx.</p>
            </div>
            <div className="faq-grid">
              {[
                { q: 'Is Vortyx actually private?', a: 'Yes. We use end-to-end encryption for all messages and voice data. We don\'t sell your data to anyone.' },
                { q: 'Can I import my data from other apps?', a: 'We are currently working on an importer for major legacy platforms. Stay tuned!' },
                { q: 'Is there a mobile app?', a: 'Android is coming very soon. iOS will follow shortly after.' },
                { q: 'How do custom roles work?', a: 'You can design roles with specific colors, icons, and permissions that are unique to your identity.' },
              ].map((item, i) => (
                <details key={i} className="faq-item glass-card">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
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
              className="glass-card shine-effect"
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
                <a href="#" onClick={handleDownload}>Download</a>
                <a href="#features">Features</a>
                <a href="https://github.com/vortyxcommunity/VORTYX-COMMUNITY/releases" target="_blank" rel="noopener noreferrer">Releases</a>
                <a href="#faq">FAQ</a>
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

      <Auth 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={() => navigate('/dashboard')} 
      />
    </div>
  );
};

export default Landing;
