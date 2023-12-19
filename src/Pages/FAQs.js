import "../Styles/FAQs.css";

export default function FAQs() {
  return (
    <div className="aboutUsContainer">
      <div>
        <h3>FAQs</h3>
        <div className="QuestionContainer">
          <h4>Can I enter a score from a previous day?</h4>
          <p>
            No, unfortunately you cannot currently enter scores from previous
            days.
            <br /> If you do forget to enter a score for a day, you can email me
            at fraserd1413@gmail.com and I will enter it into the database
            manually. There are currently no plans to implement this
            functionality, but should there be a demand for it, then this will
            be reconsidered.
          </p>
        </div>
        <div className="QuestionContainer">
          <h4>What do I do if I find a bug in the website?</h4>
          <p>
            Please contact me at fraserd1413@gmail.com with an image and
            description of the bug. I will then do my best to replicate and then
            fix any issues that you may have encountered whilst using Sheet
            Storm.
          </p>
        </div>
        <div className="QuestionContainer">
          <h4>Has anyone asked even a single one of these questions?</h4>
          <p>
            No. Nor will anyone ever ask any of these questions, but it makes
            the website look more professional lmao.
          </p>
        </div>
      </div>
    </div>
  );
}
