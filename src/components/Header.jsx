import React, { useRef, useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import useOutsideClick from "../utils/useOutsideClick";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div className="headerSearch">
      <div className="headerSearchItem">
        <MdLocationOn className="headerIcon locationIcon" />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          type="text"
          placeholder="where to go?"
          className="headerSearchInput"
          name="destination"
          id="destination"
        />
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <HiCalendar className="headerIcon dateIcon" />
        <div className="dateDropDown" onClick={() => setOpenDate(!openDate)}>
          {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
        </div>
        <span className="seperator"></span>
        {openDate && (
          <DateRange
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
            ranges={date}
            className="date"
          />
        )}
      </div>
      <div className="headerSearchItem">
        <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
          {options.adult} adult &nbsp;&bull;&nbsp; {options.children} children
          &nbsp;&bull;&nbsp; 2 room
          <span className="seperator"></span>
        </div>
        {openOptions && (
          <GuestOptionList
            setOpenOptions={setOpenOptions}
            handleOptions={handleOptions}
            options={options}
          />
        )}
      </div>

      <div className="headerSearchItem">
        <button className="headerSearchBtn">
          <HiSearch className="headerIcon" />
        </button>
      </div>
    </div>
  );
};

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef();

  useOutsideClick(optionRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}
function OptionItem({ type, options, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
