const SidebarRail = ({
  displayType,
  setDisplayType,
  setCurrentSource
}) => {
  return (
    <aside className="sidebar-rail">
      <div className="rail-header">
        <img 
          src="https://avatars.githubusercontent.com/u/217141310?s=400&u=e512aeed372f27556fb6e0860df81ec3638a78ba&v=4" 
          alt="Avatar" 
          className="rail-avatar"
        />
      </div>
      <div 
        className={`rail-item ${displayType === 'markdown' ? 'active' : ''}`}
        onClick={() => {
          setDisplayType('markdown');
          setCurrentSource('foss'); 
        }}
      >
        <div className="ripple-wrapper"><md-ripple></md-ripple></div>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
      </div>
      <div 
        className={`rail-item ${displayType === 'visualizer' ? 'active' : ''}`}
        onClick={() => setDisplayType('visualizer')}
      >
        <div className="ripple-wrapper"><md-ripple></md-ripple></div>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="12" rx="2"></rect>
          <path d="M8 20h8"></path>
          <path d="M12 16v4"></path>
        </svg>
      </div>
      <div
        className={`rail-item ${displayType === 'otp' ? 'active' : ''}`}
        onClick={() => setDisplayType('otp')}
      >
        <div className="ripple-wrapper"><md-ripple></md-ripple></div>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="10" rx="2"></rect>
          <path d="M8 11V8a4 4 0 0 1 8 0v3"></path>
          <path d="M12 15v2"></path>
        </svg>
      </div>
      <div 
        className={`rail-item ${displayType === 'video' ? 'active' : ''}`} 
        onClick={() => setDisplayType('video')}
        title="Watch Video"
      >
        <div className="ripple-wrapper"><md-ripple></md-ripple></div>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </div>
      <div className="rail-spacer"></div>
      <div 
        className="rail-item" 
        onClick={() => window.open('https://github.com/duyxyz', '_blank')}
        title="GitHub Profile"
      >
        <div className="ripple-wrapper"><md-ripple></md-ripple></div>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      </div>
    </aside>
  );
};

export default SidebarRail;
