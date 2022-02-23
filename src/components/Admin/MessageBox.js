function MessageBox({
  message,
  btn1Text,
  btn2Text,
  btn1EventHandler,
  btn2EventHandler,
}) {
  return (
    <div className="black-background">
      <div className="message-box">
        <h3>{message}</h3>
        <div className="message-box-btn-grp">
          <button className="btn-red" onClick={btn1EventHandler}>
            {btn1Text}
          </button>
          <button className="btn-gray" onClick={btn2EventHandler}>
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
export default MessageBox;
