import React, { useState } from "react";

function Checkout({ cart, clearCart }) {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [classification, setClassification] = useState("");

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const apiKey = "add your api key";

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              {
                role: "user",
                content: `Classify the following feedback into Positive, Neutral, or Negative: "${feedback}"`,
              },
            ],
            max_tokens: 10,
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text(); // Get the error message
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorDetails}`
        );
      }

      const data = await response.json();
      const classification =
        data.choices[0]?.message.content.trim() || "Unknown";
      setClassification(classification);
    } catch (error) {
      console.error("Error calling OpenAI:", error.message);
      setClassification("Error classifying feedback");
    }

    clearCart();
    setSubmitted(true);
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h2>Thank you for your purchase!</h2>
          <p>We value your feedback: {feedback}</p>
          <p>Feedback Classification: {classification}</p>
        </div>
      ) : (
        <div>
          <h2>Checkout</h2>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price.toFixed(2)}</p>
                <p>Quantity: {product.quantity}</p>
              </li>
            ))}
          </ul>
          <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
          <form onSubmit={handleFeedbackSubmit}>
            <label>
              Feedback:
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </label>
            <button type="submit">Complete Purchase</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Checkout;
