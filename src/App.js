import { useState, useMemo } from "react";
import "./App.css";

const dateArray = [
  "24-Apr-2024",
  "02-May-2024",
  "09-May-2024",
  "31-May-2024",
  "21-Jun-2024",
];

const strategyArray = [
  {
    View: "Bullish",
    Value: {
      "24-Apr-2024": [
        "Bull Call Spread",
        "Bull Put Spread",
        "Bull Put Spread",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Bull Call Spread",
      ],
      "02-May-2024": [
        "Bull Call Spread",
        "Bull Call Spread",
        "Bull Put Spread",
        "Long Call",
        "Long Call",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Bull Call Spread",
      ],
      "09-May-2024": [
        "Strategy Put",
        "Strategy Call",
        "Strategy Call",
        "Strategy Call",
        "Strategy Put",
      ],
    },
  },
  {
    View: "Bearish",
    Value: {
      "24-Apr-2024": [
        "Bear Call Spread",
        "Bear Call Spread",
        "Bear Call Spread",
        "Long Put",
        "Long Put",
        "Long Put",
        "Bear Call Spread",
      ],
      "02-May-2024": [
        "Long Put",
        "Long Put",
        "Long Put",
        "Long Put",
        "Long Put",
      ],
      "09-May-2024": [
        "Strategy3",
        "Strategy3",
        "Bear Put Spread",
        "Strategy3",
        "Long Put",
        "Long Put",
      ],
    },
  },
  {
    View: "RangeBound",
    Value: {
      "24-Apr-2024": [
        "Short Straddle",
        "Short Strangle",
        "Short Strangle",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Short Straddle",
      ],
      "02-May-2024": [
        "Short Straddle",
        "Short Straddle",
        "Short Strangle",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Short Straddle",
      ],
      "21-Jun-2024": [
        "Iron Condor",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Condor",
      ],
    },
  },
  {
    View: "Volatile",
    Value: {
      "02-May-2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy1",
        "Strategy1",
        "Spread-Strategy",
        "Long Straddle",
      ],
      "09-May-2024": [
        "Long Straddle",
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Long Straddle",
      ],
      "31-May-2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
      ],
    },
  },
];

export default function App() {
  const [selectedView, setSelectedView] = useState("Bullish");
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const views = ["Bullish", "Bearish", "RangeBound", "Volatile"];

  const formatDate = (date) => {
    return date.replace(/-/g, " ");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDropdownOpen(false);
  };

  // const getStrategies = () => {
  const getStrategies = useMemo(() => {
    const viewDate = strategyArray.find((ele) => ele.View == selectedView);
    console.log(viewDate);

    if (!viewDate || !viewDate.Value[selectedDate]) {
      console.log("Adarsg");
      return [];
    }

    const strategies = viewDate.Value[selectedDate];

    const strategyCounts = {};

    strategies.forEach((strategy) => {
      if (strategyCounts[strategy]) {
        strategyCounts[strategy] = strategyCounts[strategy] + 1;
      } else {
        strategyCounts[strategy] = 1;
      }
    });

    const result = [];
    for (let strategyName in strategyCounts) {
      result.push({
        name: strategyName,
        count: strategyCounts[strategyName],
      });
    }
    console.log("result");
    console.log(result);

    return result;

    // };
  }, [selectedView, selectedDate]);

  return (
    <div className="app-container">
      {/* <h1>Adarsh Kamble Assignment</h1> */}
      <h1>Strategy Viewer</h1>
      <div className="toggle-container">
        <button
          onClick={() => setSelectedView("Bullish")}
          className={selectedView === "Bullish" ? "active" : ""}
        >
          Bullish
        </button>
        <button
          onClick={() => setSelectedView("Bearish")}
          className={selectedView === "Bearish" ? "active" : ""}
        >
          Bearish
        </button>
        <button
          onClick={() => setSelectedView("RangeBound")}
          className={selectedView === "RangeBound" ? "active" : ""}
        >
          Range Bound
        </button>
        <button
          onClick={() => setSelectedView("Volatile")}
          className={selectedView === "Volatile" ? "active" : ""}
        >
          Volatile
        </button>
      </div>

      {/* Custom Date Dropdown */}
      <div className="dropdown-container">
        {/* Selected Date Display */}
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`dropdown-display ${isDropdownOpen ? "open" : ""}`}
        >
          <span>{formatDate(selectedDate)}</span>
          <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
            ▲
          </span>
        </div>

        {/* Dropdown Options */}
        {isDropdownOpen && (
          <div className="dropdown-list">
            {dateArray.map((date, index) => (
              <div
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`dropdown-option ${
                  selectedDate === date ? "selected" : ""
                }`}
              >
                {formatDate(date)}
              </div>
            ))}
          </div>
        )}

        {/* Close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div
            onClick={() => setIsDropdownOpen(false)}
            className="dropdown-overlay"
          />
        )}
      </div>

      {/* Date Toggle 
      <div className="date-dropdown">
        <label> Date </label>
        <select
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
          }}
        >
          {dateArray.map((element) => {
            return (
              <option key={element} value={element} className="dropdown-option">
                {element}
              </option>
            );
          })}
           <option>Adarsh</option>
          <option>Adarsh</option>
          <option>Adarsh</option>
          <option>Adarsh</option> 
        </select>

        {selectedDate}
      </div>
      */}

      {/* Stratergy section */}

      <div className="strategies-section">
        <h2>
          {getStrategies.length > 0 ? "Available Strategies" : "No Strategies"}
        </h2>

        {getStrategies.length > 0 ? (
          <div className="cards-grid">
            {getStrategies.map((strategy, index) => (
              <div key={index} className="strategy-card">
                <h3>{strategy.name}</h3>
                <div className="strategy-count">
                  {strategy.count}{" "}
                  {strategy.count === 1 ? "Strategy" : "Strategies"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Strategies Available</h3>
            <p>There are no strategies for {selectedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}
