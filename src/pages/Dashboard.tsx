import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  User, Users, Server, Settings, LogOut, 
  Plus, Bell, Camera, Image as ImageIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'friends' | 'servers' | 'settings'>('profile');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Mocking profile data for now, ideally fetch from 'profiles' table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData || { 
        username: user.user_metadata.username || user.email?.split('@')[0],
        avatar_url: null,
        banner_url: null,
        status: 'Online'
      });

      // Fetch friends (mock or real table)
      const { data: friendsData } = await supabase
        .from('friends')
        .select('*')
        .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);
      setFriends(friendsData || []);

      // Fetch servers (mock or real table)
      const { data: serversData } = await supabase
        .from('server_members')
        .select('servers(*)')
        .eq('user_id', user.id);
      setServers(serversData?.map((s: any) => s.servers) || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate('/');
  };

  const handleAddFriend = async () => {
    if (!supabase) return;
    const friendId = prompt('Enter User ID to add:');
    if (!friendId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('friends')
        .insert([{ user_id: user.id, friend_id: friendId, status: 'pending' }]);
      
      if (error) throw error;
      alert('Friend request sent!');
    } catch (err: any) {
      alert('Error sending request: ' + err.message);
    }
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      const updateData = type === 'avatar' ? { avatar_url: publicUrl } : { banner_url: publicUrl };
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (updateError) throw updateError;
      
      setProfile({ ...profile, ...updateData });
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
    }
  };

  if (loading) return (
    <div className="dashboard-loading">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="bg-gradient" />
      
      <aside className="dashboard-sidebar glass-card premium-sidebar">
        <div className="sidebar-logo">
          <img src="/vortyx-logo.png" alt="Vortyx Logo" className="logo-img" />
          <h1 className="logo-text">VORTYX<span>.</span></h1>
        </div>
        
        <nav className="sidebar-nav">
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            <User size={20} /> <span>Profile</span>
          </button>
          <button className={activeTab === 'friends' ? 'active' : ''} onClick={() => setActiveTab('friends')}>
            <Users size={20} /> <span>Friends</span>
          </button>
          <button className={activeTab === 'servers' ? 'active' : ''} onClick={() => setActiveTab('servers')}>
            <Server size={20} /> <span>Servers</span>
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header glass-card">
          <div className="profile-banner-container">
            <div className="profile-banner" style={{ background: profile?.banner_url ? `url(${profile.banner_url})` : 'var(--premium-gradient)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <label className="edit-banner">
                <ImageIcon size={18} />
                <input type="file" hidden accept="image/*" onChange={(e) => uploadFile(e, 'banner')} />
              </label>
            </div>
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : <User size={40} />}
                <label className="edit-avatar">
                  <Camera size={16} />
                  <input type="file" hidden accept="image/*" onChange={(e) => uploadFile(e, 'avatar')} />
                </label>
              </div>
              <div className="profile-info">
                <h2>{profile?.username}</h2>
                <div className="status-badge">
                  <div className="status-dot online" />
                  <span>{profile?.status}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          {activeTab === 'profile' && (
            <>
              <section className="dashboard-section glass-card">
                <div className="section-header">
                  <h3><Users size={20} /> Friends</h3>
                  <button className="icon-btn" onClick={handleAddFriend} title="Add Friend"><Plus size={18} /></button>
                </div>
                <div className="friends-list">
                  {friends.length > 0 ? friends.map((f: any) => (
                    <div key={f.id} className="friend-item">
                      {/* Friend display logic */}
                    </div>
                  )) : (
                    <p className="empty-msg">No friends yet. Start connecting!</p>
                  )}
                </div>
              </section>

              <section className="dashboard-section glass-card">
                <div className="section-header">
                  <h3><Server size={20} /> Servers</h3>
                  <button className="icon-btn"><Plus size={18} /></button>
                </div>
                <div className="servers-list">
                  {servers.length > 0 ? servers.map((s: any) => (
                    <div key={s.id} className="server-item">
                      <div className="server-icon">{s.name[0]}</div>
                      <span>{s.name}</span>
                    </div>
                  )) : (
                    <p className="empty-msg">You haven't joined any servers.</p>
                  )}
                </div>
              </section>

              <section className="dashboard-section glass-card full-width">
                <div className="section-header">
                  <h3><Bell size={20} /> Friend Requests</h3>
                </div>
                <div className="requests-list">
                  {/* Real Logic for requests could go here */}
                  <p className="empty-msg">No pending requests.</p>
                </div>
              </section>
            </>
          )}

          {activeTab === 'settings' && (
            <section className="dashboard-section glass-card full-width">
              <div className="section-header">
                <h3><Settings size={20} /> User Settings</h3>
              </div>
              <div className="settings-content py-4 space-y-6">
                <div className="settings-group">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Account Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                      <label className="text-xs text-muted-foreground">Username</label>
                      <p className="font-bold">{profile?.username}</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                      <label className="text-xs text-muted-foreground">Status</label>
                      <p className="font-bold">{profile?.status}</p>
                    </div>
                  </div>
                </div>
                
                <div className="settings-group">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Privacy & Security</h4>
                  <p className="text-sm text-muted-foreground mb-4">Manage how your data is handled on the Vortyx platform.</p>
                  <button className="btn-secondary w-full md:w-auto">Change Password</button>
                </div>

                <div className="settings-group">
                  <h4 className="text-sm font-bold text-danger uppercase tracking-widest mb-4">Danger Zone</h4>
                  <button className="btn-danger w-full md:w-auto opacity-50 cursor-not-allowed">Delete Account</button>
                </div>
              </div>
            </section>
          )}

          {(activeTab === 'friends' || activeTab === 'servers') && (
             <section className="dashboard-section glass-card full-width">
                <div className="section-header">
                  <h3>{activeTab === 'friends' ? <Users size={20} /> : <Server size={20} />} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                </div>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {activeTab === 'friends' ? <Users className="text-primary" /> : <Server className="text-primary" />}
                  </div>
                  <h4 className="font-bold">No {activeTab} yet</h4>
                  <p className="text-sm text-muted-foreground mt-2">Start joining communities to see them here.</p>
                  <button className="btn-primary mt-6">Discover {activeTab}</button>
                </div>
             </section>
          )}
        </div>
      </main>
    </div>
  );
};
