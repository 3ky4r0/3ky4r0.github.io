import React from 'react';
import TreeFolder from './TreeFolder';
import TreeItem from './TreeItem';

const SidebarMain = ({ 
  fileWidth, 
  startResizing, 
  expandedFolders, 
  toggleFolder, 
  displayType, 
  currentSource, 
  setCurrentSource, 
  setDisplayType,
  currentImage,
  openImage,
  currentPdf,
  openPdf,
  totpCodes,
  BANK_IMAGES
}) => {
  return (
    <aside
      className="sidebar-left"
      style={{ width: window.innerWidth > 768 ? `${fileWidth}px` : undefined }}
    >
      <div className="sidebar-resizer resizer-right" onMouseDown={startResizing('file')} />
      <div className="sidebar-header">Files</div>
      <div className="tree-container">
        <TreeFolder 
          title="The Vault" 
          className="hide-mobile"
          expanded={expandedFolders.resources}
          onToggle={() => toggleFolder('resources')}
        >
          <TreeItem 
            active={displayType === 'markdown' && currentSource === 'foss'}
            onClick={() => { setCurrentSource('foss'); setDisplayType('markdown'); }}
          >
            <span>Essentials</span>
          </TreeItem>
          <TreeItem 
            active={displayType === 'markdown' && currentSource === 'v'}
            onClick={() => { setCurrentSource('v'); setDisplayType('markdown'); }}
          >
            <span>Logbook</span>
          </TreeItem>
        </TreeFolder>

        <TreeFolder 
          title="Academy" 
          expanded={expandedFolders.ute} 
          onToggle={() => toggleFolder('ute')}
        >
          <TreeItem 
            active={displayType === 'pdf' && currentPdf.src === 'ute/chuongtrinhdaotao.pdf'}
            onClick={() => openPdf('ute/chuongtrinhdaotao.pdf', 'Chương trình Đào tạo')}
          >
            <span>Registry</span>
          </TreeItem>
          <TreeItem 
            active={displayType === 'pdf' && currentPdf.src === 'ute/sotaysinhvien.pdf'}
            onClick={() => openPdf('ute/sotaysinhvien.pdf', 'Sổ tay Sinh viên')}
          >
            <span>Handbook</span>
          </TreeItem>
        </TreeFolder>

        <TreeFolder 
          title="Treasury" 
          expanded={expandedFolders.bank}
          onToggle={() => toggleFolder('bank')}
        >
          {BANK_IMAGES.map(bank => (
            <TreeItem 
              key={bank.label}
              active={displayType === 'image' && currentImage.label === bank.label}
              onClick={() => openImage(bank.src, bank.label)}
            >
              <span>{bank.label}</span>
            </TreeItem>
          ))}
        </TreeFolder>

        <TreeFolder 
          title="Sentinel" 
          expanded={expandedFolders.authenticator} 
          onToggle={() => toggleFolder('authenticator')}
        >
          {[
            { code: totpCodes.key1, color: 'red' },
            { code: totpCodes.key2, color: 'blue' },
            { code: totpCodes.key3, color: 'neutral' },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="tree-item totp-item" 
              onClick={() => navigator.clipboard.writeText(item.code)}
            >
              <div className={`otp-container ${item.color}`}>
                {item.code.split('').map((char, i) => (
                  <span key={i} className="otp-digit">{char}</span>
                ))}
              </div>
            </div>
          ))}
        </TreeFolder>
      </div>
    </aside>
  );
};

export default SidebarMain;
