import React from "react"

// TODO: Update text, add prop for CTA/children?
const InfoFooter = () => (
  <div className="info-footer">
    <div>
      <h3>Interested in learning more?</h3>
      <p>
        Sign up for our newsletter to get the latest from our *proactive*
        political rundown, the Documenters Newswire.
      </p>
      <form
        action="https://citybureau.us11.list-manage.com/subscribe/post?u=5d2d7d56eca627ab2ca1a9c7e&amp;id=80e2e0ec06"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        <input
          type="hidden"
          id="mailchimp-group-input"
          name="group[12493][2048]"
          defaultValue="1"
        />
        <div style={{ position: "absolute", left: -5000 }} aria-hidden="true">
          <input
            type="text"
            name="b_5d2d7d56eca627ab2ca1a9c7e_80e2e0ec06"
            tabIndex="-1"
            defaultValue=""
          />
        </div>
        <div className="subscribe-input">
          <input
            aria-label="Email"
            placeholder="Email address"
            type="email"
            defaultValue=""
            name="EMAIL"
            id="mce-EMAIL"
            required
          />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </div>
  </div>
)

export default InfoFooter
