import React, { useState } from 'react';
import { FileText, Send, MessageSquare, Upload, Plus, FileCode, Book } from 'lucide-react';
import classNames from 'classnames';
import { CodeEditor } from '../components/CodeEditor';
import { FileExplorer } from '../components/FileExplorer';

const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
];

const MOCK_FILES = [
  {
    id: 'src',
    name: 'src',
    type: 'folder' as const,
    children: [
      {
        id: 'main',
        name: 'main.ts',
        type: 'file' as const,
        language: 'typescript',
      },
      {
        id: 'utils',
        name: 'utils',
        type: 'folder' as const,
        children: [
          {
            id: 'helpers',
            name: 'helpers.ts',
            type: 'file' as const,
            language: 'typescript',
          },
        ],
      },
    ],
  },
  {
    id: 'docs',
    name: 'docs',
    type: 'folder' as const,
    children: [
      {
        id: 'readme',
        name: 'README.md',
        type: 'file' as const,
        language: 'markdown',
      },
    ],
  },
];

export function StartupEditor() {
  const [selectedFile, setSelectedFile] = useState<string>('main');
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const [code, setCode] = useState('// Start coding here...');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Gemini API
    setResponse('AI response will appear here...');
    setPrompt('');
  };

  const handleAddFile = () => {
    setIsCreatingFile(true);
  };

  const handleFileCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFileName.trim()) {
      // TODO: Implement actual file creation
      console.log('Creating file:', newFileName);
      setIsCreatingFile(false);
      setNewFileName('');
    }
  };

  const handleAddCollaborator = () => {
    // TODO: Implement collaborator invitation
    console.log('Add collaborator');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement file upload and processing
      console.log('Uploaded file:', file.name);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Top Bar */}
      <div className="col-span-12 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 cursor-pointer">
              <Upload size={20} />
              <span>Upload Documents</span>
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100">
              <Book size={20} />
              <span>View Documentation</span>
            </button>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* File Explorer */}
      <div className="col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
        <FileExplorer
          files={MOCK_FILES}
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
          onAddFile={handleAddFile}
          onAddCollaborator={handleAddCollaborator}
        />
        
        {/* New File Dialog */}
        {isCreatingFile && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form onSubmit={handleFileCreate} className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h3 className="text-lg font-semibold mb-4">Create New File</h3>
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="Enter file name..."
                className="w-full p-2 border rounded-md mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingFile(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="col-span-10 grid grid-rows-[1fr] gap-4 relative">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <CodeEditor
            language={selectedLanguage}
            value={code}
            onChange={(value) => setCode(value || '')}
          />
        </div>

        {/* AI Assistant Toggle */}
        <button
          onClick={() => setShowAiAssistant(!showAiAssistant)}
          className={classNames(
            'absolute bottom-6 right-6 p-3 rounded-full shadow-lg transition-all transform hover:scale-110',
            showAiAssistant ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'
          )}
        >
          <MessageSquare size={24} />
        </button>

        {/* AI Assistant Panel */}
        {showAiAssistant && (
          <div className="absolute right-6 bottom-20 w-96 bg-white rounded-lg shadow-xl p-4 transform transition-all">
            <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md">
              {response}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask the AI assistant..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}