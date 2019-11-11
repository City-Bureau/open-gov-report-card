import React from "react"

// TODO: Which newsletter?
const InfoFooter = () => (
  <div className="info-footer">
    <div>
      <p>
        Help us protect your democracy. Donate to our nonprofit civic news lab
        and{" "}
        <a
          href="https://www.citybureau.org/press-club"
          target="_blank"
          rel="noopener noreferrer"
        >
          your contribution
        </a>{" "}
        will be doubled through December 31, thanks to NewsMatch.
      </p>
      <p>
        Sign up for our newsletter to get the latest news and events from City
        Bureau.
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
