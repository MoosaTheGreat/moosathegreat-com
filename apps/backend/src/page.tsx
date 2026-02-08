'use client';

import { useState } from 'react';

const Block = ({ title, color, onDragStart }) => (
  <div
    draggable
    onDragStart={onDragStart}
    className={`p-2 mb-2 cursor-grab border-l-4 ${color}`}
  >
    {title}
  </div>
);

const CanvasBlock = ({ block, index }) => (
  <div className={`p-4 mb-2 border border-gray-700 bg-gray-900`}>
    <p className="font-bold">{block.type}</p>
    <pre className="text-xs text-gray-400 mt-2">
      {JSON.stringify(block.params, null, 2)}
    </pre>
  </div>
);

export default function VisualCoderPage() {
  const [canvasBlocks, setCanvasBlocks] = useState([]);

  const availableBlocks = [
    {
      type: 'AI_CALL',
      params: { prompt: '{{context.args[0]}}' },
      color: 'border-blue-500',
    },
    {
      type: 'DB_QUERY',
      params: { model: 'user', operation: 'findMany', query: {} },
      color: 'border-green-500',
    },
    {
      type: 'DISCORD_MESSAGE',
      params: { channelId: 'your-channel-id', message: 'Hello from the flow!' },
      color: 'border-purple-500',
    },
    {
      type: 'SYSTEM_LOG',
      params: { message: 'Step executed' },
      color: 'border-yellow-500',
    },
  ];

  const handleDragStart = (e, block) => {
    e.dataTransfer.setData('application/json', JSON.stringify(block));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const blockData = JSON.parse(e.dataTransfer.getData('application/json'));
    setCanvasBlocks([...canvasBlocks, blockData]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = () => {
    const logicFlow = { blocks: canvasBlocks.map(({ color, ...rest }) => rest) };
    console.log('Saving flow:', JSON.stringify(logicFlow, null, 2));
    alert('Flow saved to console. See JSON output.');
    // In a real app, this would be a POST request to the backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">
            Visual Logic Coder
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Create command and plugin logic by connecting blocks
          </p>
        </div>
        <button
          onClick={handleSave}
          className="bg-white text-black font-bold py-2 px-4 uppercase tracking-widest text-xs"
        >
          Save Flow
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[70vh]">
        {/* Block Palette */}
        <div className="col-span-3 border border-gray-800 p-4">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">
            Blocks
          </h3>
          {availableBlocks.map((block, i) => (
            <Block
              key={i}
              title={block.type.replace('_', ' ')}
              color={block.color}
              onDragStart={(e) => handleDragStart(e, block)}
            />
          ))}
        </div>

        {/* Canvas */}
        <div
          className="col-span-9 border border-dashed border-gray-600 p-4 overflow-y-auto"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {canvasBlocks.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Drop blocks here to build your logic flow
              </p>
            </div>
          ) : (
            canvasBlocks.map((block, i) => (
              <CanvasBlock key={i} block={block} index={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}