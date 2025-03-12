import React from 'react';
import { FileText, Folder, ChevronRight, ChevronDown, Plus, Users } from 'lucide-react';
import classNames from 'classnames';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  language?: string;
}

interface FileExplorerProps {
  files: FileNode[];
  selectedFile?: string;
  onFileSelect: (fileId: string) => void;
  onAddFile: () => void;
  onAddCollaborator: () => void;
}

export function FileExplorer({ files, selectedFile, onFileSelect, onAddFile, onAddCollaborator }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set());

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderNode = (node: FileNode) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = node.id === selectedFile;

    return (
      <div key={node.id}>
        <div
          className={classNames(
            'flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer',
            isSelected && 'bg-blue-50 hover:bg-blue-100'
          )}
          onClick={() => node.type === 'file' ? onFileSelect(node.id) : toggleFolder(node.id)}
        >
          {node.type === 'folder' && (
            isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />
          )}
          {node.type === 'folder' ? <Folder size={18} /> : <FileText size={18} />}
          <span className="flex-1">{node.name}</span>
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div className="ml-4">
            {node.children.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Project Files</h2>
        <div className="flex gap-2">
          <button
            onClick={onAddFile}
            className="p-1 hover:bg-gray-100 rounded"
            title="Add File"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={onAddCollaborator}
            className="p-1 hover:bg-gray-100 rounded"
            title="Add Collaborator"
          >
            <Users size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {files.map(file => renderNode(file))}
      </div>
    </div>
  );
}