import "../Styles/FAQs.css";

export default function FAQs() {
  return (
    <div style={{ marginBottom: "10vw" }}>
      <h3>Frequently Asked Questions</h3>
      <div className="QuestionContainer">
        <h4>Can I enter a score from a previous day?</h4>
        <p>
          No.
          <br />
          <br />
          I don't think that it's fair to open up the possibility for cheating.
          (I also couldn't be arsed to allow you to choose what day you're
          entering a score for)
          <br />
          <br />
          Alternatively, you could ask Fraser very kindly to enter it for you on
          the database that only he has access to.
        </p>
      </div>
      <div className="QuestionContainer">
        <h4>What do I do if I find a bug in the website?</h4>
        <p>
          Please contact me at fraserd1413@gmail.com where I will do my best to
          replicate and then fix any issues that you may have encountered whilst
          using Sheet Storm.
        </p>
      </div>
      <div className="QuestionContainer">
        <h4>Has anyone asked even a single one of these questions?</h4>
        <p>
          No. Nor will anyone ever ask any of these questions, but it makes the
          website look more professional lmao.
        </p>
      </div>
    </div>
  );
}
