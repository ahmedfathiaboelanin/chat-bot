const MentionsList = ({ options, onSelect, mentionsRef }) => (
    <div
        ref={mentionsRef}
        className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto"
    >
        {options.map((option) => (
            <div
                key={option.id}
                onClick={() => onSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
                {option.name}
            </div>
        ))}
    </div>
);

export default MentionsList