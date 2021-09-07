import React from "react";
import moment from "moment";
import "./Calendar.css";
import DragBox from "./DragDiv";

export default class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    showCalendarTable: true,
    showMonthTable: false,
    dateObject: moment(),
    allmonths: moment.months(),
    showYearNav: false,
    selectedDay: null,
    selectedMonth: null,
    selectedYear: null,
    selectedClass: "",
  };

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable,
      selectedMonth: this.month(),
    });
  };
  setMonth = (month) => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable,
      selectedMonth: this.month(),
    });
  };
  MonthList = (props) => {
    let months = [];
    props.data.map((data) => {
      return months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearEditor = () => {
    this.setState({
      showYearNav: true,
      showCalendarTable: !this.state.showCalendarTable,
      selectedYear: this.year(),
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showMonthTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr),
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showMonthTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr),
      selectedYear: this.year(),
    });
  };
  setYear = (year) => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      //   showMonthTable: !this.state.showMonthTable,
      showYearNav: !this.state.showYearNav,
      showMonthTable: !this.state.showMonthTable,
      selectedYear: this.year(),
      selectedMonth: this.month(),
    });
  };
  onYearChange = (e) => {
    this.setYear(e.target.value);
    this.setState({
      selectedYear: this.year(),
    });
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = (props) => {
    let months = [];
    let nextten = moment().set("year", props).add(12, "year").format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map((data) => {
      return months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Yeah</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };
  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d,
        selectedMonth: this.month(),
        selectedYear: this.year(),
      },
      () => {
        console.log(
          "SELECTED DAY: ",
          this.state.selectedDay,
          this.state.selectedMonth,
          this.state.selectedYear
        );
      }
    );
  };
  render() {
    console.log(this.state.selectedDay, "selectedDay");
    let weekdayshortname = this.weekdayshort.map((day) => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td  className="calendar-day empty">{""}</td>);
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
      // let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={(e) => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <div className="calendar-comp">
        <div className="tail-datetime-calendar">
          <div className="calendar-navi">
            <span
              onClick={(e) => {
                this.onPrev();
              }}
              className="calendar-button button-prev"
            />
            {!this.state.showMonthTable && !this.state.showYearEditor && (
              <span
                onClick={(e) => {
                  this.showMonth();
                }}
                className="calendar-label"
              >
                {this.month()},
              </span>
            )}
            <span
              className="calendar-label"
              onClick={(e) => {
                this.showYearEditor();
              }}
            >
              {this.year()}
            </span>

            <span
              onClick={(e) => {
                this.onNext();
              }}
              className="calendar-button button-next"
            />
          </div>
          <div className="calendar-date">
            {this.state.showYearNav && <this.YearTable props={this.year()} />}
            {this.state.showMonthTable && (
              <this.MonthList data={moment.months()} />
            )}
          </div>

          {this.state.showCalendarTable && (
            <div className="calendar-date">
              <table className="calendar-day">
                <thead>
                  <tr>{weekdayshortname}</tr>
                </thead>
                <tbody>{daysinmonth}</tbody>
              </table>
            </div>
          )}

          <div>
            <DragBox timeProb={this.state} />
          </div>
        </div>
      </div>
    );
  }
}
