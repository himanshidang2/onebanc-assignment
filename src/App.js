import "./App.css";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

const url =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

const userId = 1;

const Card = ({ amount, id, alignClass, date }) => {
  return (
    <div className={`card-wrapper  ${alignClass}`}>
      <div className="card">
        <div className="card-amount">
          <div className="amountDetails">
            <b>{amount}</b>
          </div>
          <div>You paid</div>
        </div>
        <div className="card-amountStatus">
          <div className="transectionDetails">
            <div className="t-small">Transation ID</div>
            <div className="t-small">{id}</div>
          </div>
          <div>{">"}</div>
        </div>
      </div>
      <div className="card-date t-small">{date}</div>
    </div>
  );
};

const TimeStamp = ({ date }) => {
  return (
    <div className="timeStamp">
      <div className="dots"></div>
      <div className="date">{date}</div>
      <div className="dots"></div>
    </div>
  );
};

function App() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        setTransactions(data.transactions);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const compareDate = (date1, date2) => {
    console.log();
    date1 = new Date(date1).toString().split(" ");
    date2 = new Date(date2).toString().split(" ");

    //console.log("tsting", date1.toString().split(" "));

    if (date1[2] === date2[2]) {
      console.log(true, "----->");
      return true;
    }
    console.log(false, date1[2], date2[2]);
    return false;
  };

  const dateFormatter = (date, withTime) => {
    date = new Date(date);
    let dateArray = new Date(date).toString().split(" ");
    let formattedDate = dateArray[2] + " " + dateArray[1] + " " + dateArray[3];

    let time =
      date.getHours() +
      ":" +
      date.getMinutes() +
      (date.getHours() > 11 ? "AM" : "PM");
    console.log("$$$", time);

    if (withTime) {
      return formattedDate + " " + time;
    } else {
      return formattedDate;
    }
  };
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div className="header-icon">
            <AiOutlineArrowLeft />
          </div>
          <div className="avatar">J</div>
          <div className="header-userDetails">
            <div>John Doe</div>
            <div>+91 7672 2345</div>
          </div>
        </div>
        <div className="body">
          {transactions.map((e, i) => (
            <>
              {compareDate(e.startDate, transactions[i + 1]?.startDate) && (
                <TimeStamp date={dateFormatter(e.startDate, false)} />
              )}

              <Card
                amount={e.amount}
                id={e.id}
                alignClass={userId === e.status ? "ml-auto" : ""}
                date={dateFormatter(e.startDate, true)}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
