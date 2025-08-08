export default function ScrollSidebar() {
    return (
        <div className="fixed bottom-6 right-6 z-50 bg-black/80 text-white/20 px-2 py-3 rounded shadow-lg text-xs font-light select-none pointer-events-none flex flex-col items-center">
            <span className="tracking-widest mb-1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                {'<'}

                    {/* <span className="block w-0.5 h-4 bg-white/20 rounded-full"></span> */}

                {'>'}
            </span>
            
        </div>
    );
}
