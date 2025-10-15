// Date and Time setter component
function DateTimePicker({ date, time, setDate, setTime }) {
    //get today's date in yyyy-mm-dd
    const getToday = () => {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    };

    const getDefaultTime = () => '00:00';

    const displayDate = date || getToday();
    const displayTime = time || getDefaultTime();

    //handle changes for date and time
    const handleDateChange = (e) => {
        setDate(e.target.value);
        if (!time) setTime(getDefaultTime());
    };
    const handleTimeChange = (e) => {
        setTime(e.target.value);
        if (!date) setDate(getToday());
    };

    return (
        <div className="flex flex-col px-4 mt-0 w-64">
            <p className="font-bold mb-2">Set Date</p>
            <div className="mb-2 text-sm text-gray-300"><span className="font-mono text-lg text-white">{displayDate} {displayTime}</span></div>
            <input 
                type="date" 
                id="date-picker"
                name="date"
                className="p-2 font-mono rounded mb-2 bg-black text-white border border-gray-700" 
                value={date}
                onChange={handleDateChange}
            />
            <input 
                type="time" 
                id="time-picker"
                name="time"
                className="p-2 font-mono rounded bg-black text-white border border-gray-700" 
                value={time}
                onChange={handleTimeChange}
            />
        </div>
    );
}

// Font customization components
function FontSizePicker({ fontSize, setFontSize }) {
    return (
        <div className="flex flex-col px-4 mt-0 w-32">
            <p className="font-bold mb-2">Font Size</p>
            <div className="flex gap-3 items-center mb-2">
                <input 
                    type="number"
                    id="font-size-number"
                    name="fontSize"
                    min="8"
                    max="200"
                    value={fontSize}
                    onChange={e => setFontSize(e.target.value)}
                    className="w-20 px-3 py-2 rounded bg-black text-white border border-gray-600 text-center focus:outline-none focus:border-gray-400"
                />
                <input 
                    type="range"
                    id="font-size-range"
                    name="fontSizeRange"
                    min="8"
                    max="200"
                    value={fontSize}
                    onChange={e => setFontSize(e.target.value)}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                />
            </div>
        </div>
    );
}

function FontColorPicker({ fontColor, setFontColor }) {
    return (
        <div className="flex flex-col px-4 mt-0 w-32">
            <p className="font-bold mb-2">Font Color</p>
            <input 
                type="color"
                id="font-color-picker"
                name="fontColor"
                value={fontColor}
                onChange={e => setFontColor(e.target.value)}
                className="w-10 h-10 p-0 border-0 bg-transparent cursor-pointer"
            />
        </div>
    );
}

function FontPicker({ font, setFont, fonts }) {
    const defaultFonts = [
    "Arial",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Trebuchet MS",
    "Comic Sans MS",
    "Lucida Console",
  ];

  const fontList = fonts || defaultFonts;

  return (
    <div className="flex flex-col px-4 mt-0 w-36">
      <label className="font-bold mb-2">Font</label>
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        style={{ fontFamily: font }}
        className="px-3 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:border-gray-400 cursor-pointer"
      >
        {fontList.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}

//Upload custom fonts
function FontUploader({ fonts, setFonts }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    if (ext !== "ttf" && ext !== "otf") {
      alert("Only .ttf or .otf fonts are supported");
      return;
    }

    const fontName = file.name.replace(/\.[^/.]+$/, "");
    const fontUrl = URL.createObjectURL(file);

    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: '${fontName}';
        src: url('${fontUrl}') format('${ext === "ttf" ? "truetype" : "opentype"}');
      }
    `;
    document.head.appendChild(style);

    //add new font to fonts list user can choose from
    if (!fonts.includes(fontName)) {
      setFonts([...fonts, fontName]);
    }
  };

  return (
    <div className="flex flex-col px-4 mt-0 w-64">
      <p className="font-bold mb-2">Upload Font</p>
      <label className="px-4 py-2 bg-black border border-gray-600 rounded text-white cursor-pointer hover:bg-gray-700 text-sm w-36 text-center">
        Upload
        <input
          type="file"
          accept=".ttf,.otf"
          onChange={handleFile}
          className="hidden"
        />
      </label>
    </div>
  );
}

// Background upload and color picker component
function BackgroundPicker({ background, setBackground }) {
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            const type = file.type.startsWith('video/') ? 'video' : 'image';
            setBackground({ type, value: fileUrl });
        }
    };

    const handleColor = (e) => {
        setBackground({ type: 'color', value: e.target.value });
    };

    const clearBackground = () => {
        if (background.type !== 'color') {
            URL.revokeObjectURL(background.value);
        }
        setBackground({ type: 'color', value: '#ffffff' });
    };

    const isFile = background.type !== 'color';

    return (
        <div className="flex flex-col px-4 mt-0 w-64">
            <p className="font-bold mb-2">Background</p>
            <div className="flex flex-col gap-2 mb-3">
                <input 
                    type="color"
                    value={isFile ? '#ffffff' : background.value}
                    onChange={handleColor}
                    disabled={isFile}
                    className={`w-10 h-10 p-0 border-0 bg-transparent cursor-pointer ${isFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Color Background"
                />
                </div>
                <div className="flex">
                    <label className="px-4 py-2 bg-black border border-gray-600 rounded text-white cursor-pointer hover:bg-gray-700 text-sm w-24 text-center">
                        Upload
                        <input 
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFile}
                            className="hidden"
                        />
                    </label>
                    {isFile && (
                    <div className="flex justify-between text-sm bg-black px-3 py-2 rounded">
                        <button 
                            onClick={clearBackground}
                            className="text-red-400 hover:text-red-300 text-xs"
                        >
                            Remove
                        </button>
                </div>
            )}
        </div>
        </div>
    );
}

export { DateTimePicker, FontSizePicker, FontColorPicker, FontPicker, FontUploader, BackgroundPicker };