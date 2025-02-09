import React from 'react';

function Discord() {
  const rules = [
    {
      title: "Respect All Members",
      description: (
        <>
          <strong>1.1 - General Respect:</strong> All members must treat others with respect, regardless of race, gender, religion, nationality, or personal beliefs. Harassment, bigotry, and personal attacks will not be tolerated.<br />
          <strong>1.2 - No Hate Speech:</strong> Hate speech in any form, whether it be slurs, derogatory remarks, or otherwise offensive language, is strictly forbidden.<br />
          <strong>1.3 - Constructive Discussions:</strong> Disagreements should remain civil. Debate is fine, but avoid name-calling or intentionally provoking others.
        </>
      )
    },
    {
      title: "No Spamming",
      description: (
        <>
          <strong>2.1 - Repetitive Content:</strong> Avoid posting the same message, image, or reaction repeatedly in a short period. It clutters the chat and disrupts discussions.<br />
          <strong>2.2 - Off-topic Spam:</strong> Keep discussions relevant to the channel. Don't post irrelevant content that distracts from ongoing conversations.<br />
          <strong>2.3 - Avoid Spam Bots:</strong> Using bots to spam content or reactions is strictly prohibited.
        </>
      )
    },
    {
      title: "Keep Content Appropriate",
      description: (
        <>
          <strong>3.1 - No NSFW Content:</strong> Sharing Not Safe For Work (NSFW) content, including explicit images, language, or videos, is forbidden.<br />
          <strong>3.2 - Language Use:</strong> Keep language clean and appropriate for all ages. Excessive swearing or crude jokes will not be tolerated.<br />
          <strong>3.3 - Offensive Material:</strong> Avoid posting offensive memes, jokes, or other content that might make others uncomfortable.
        </>
      )
    },
    {
      title: "No Advertising",
      description: (
        <>
          <strong>4.1 - Unsolicited Ads:</strong> Do not promote other servers, websites, products, or services without the explicit permission of the server admins.<br />
          <strong>4.2 - No Self-Promotion:</strong> Self-promotion, including links to personal content like Twitch streams, YouTube videos, or social media accounts, is prohibited unless approved by staff.
        </>
      )
    },
    {
      title: "Respect Privacy",
      description: (
        <>
          <strong>5.1 - Personal Information:</strong> Do not share someone else’s personal information, such as names, addresses, or phone numbers, without their explicit consent.<br />
          <strong>5.2 - Privacy in DMs:</strong> Do not share screenshots or private conversations from direct messages (DMs) without the consent of the parties involved.
        </>
      )
    },
    {
      title: "Follow Discord's Terms of Service",
      description: (
        <>
          <strong>6.1 - Discord Community Guidelines:</strong> All users must adhere to Discord's Community Guidelines at all times.<br />
          <strong>6.2 - Terms of Service:</strong> You must also comply with Discord’s Terms of Service.
        </>
      )
    },
    {
      title: "Use Channels Appropriately",
      description: (
        <>
          <strong>7.1 - Off-topic Posting:</strong> Ensure that all posts are relevant to the specific channel you're posting in. Each channel has a description or pinned message outlining its purpose.<br />
          <strong>7.2 - Channel-specific Rules:</strong> Follow any additional channel-specific rules that may be set by staff or pinned in the channel.
        </>
      )
    },
    {
      title: "No Impersonation",
      description: (
        <>
          <strong>8.1 - Member Impersonation:</strong> Do not impersonate other users, especially staff members or other members of the community. This includes usernames, profile pictures, or behavior intended to deceive others.<br />
          <strong>8.2 - Public Figure Impersonation:</strong> Impersonation of public figures, famous personalities, or celebrities is also not allowed.
        </>
      )
    },
    {
      title: "Listen to Staff",
      description: (
        <>
          <strong>9.1 - Follow Instructions:</strong> Staff decisions and instructions are final and should be respected at all times. Staff actions are taken in the interest of maintaining a safe, welcoming environment for all.<br />
          <strong>9.2 - Handling Disputes:</strong> If you have an issue with a staff member's decision, address it privately and respectfully through a support ticket or DM rather than publicly.
        </>
      )
    },
    {
      title: "Report Issues",
      description: (
        <>
          <strong>10.1 - Reporting Rule Breakers:</strong> If you witness someone breaking the rules, do not engage with them directly. Instead, report the issue to staff using a support ticket or a DM.<br />
          <strong>10.2 - Support Ticket Usage:</strong> All reports should be made through the designated support channel to ensure the issue is handled discreetly and efficiently.
        </>
      )
    },
    {
      title: "No Loophole Abuse",
      description: (
        <>
          <strong>11.1 - General Loophole Abuse:</strong> Do not attempt to exploit loopholes, ambiguities, or technicalities in the rules to justify inappropriate behavior.<br />
          <strong>11.2 - Good Faith Behavior:</strong> All members are expected to act in good faith and uphold the spirit of the rules. Attempts to ‘game the system’ by manipulating or finding loopholes will be treated as violations of this rule.<br />
          <strong>11.3 - Rules Apply Globally:</strong> All rules are subject to staff interpretation, and exploiting any gap or ambiguity will result in enforcement actions as if the rule were explicitly written.
        </>
      )
    }
  ];

  return (
    <div className="discord-container page-container">
      <h1>Join Our Discord Community!</h1>
      
      <div className="discord-rules">
        <h2>Discord Rules</h2>
        <div>
          {rules.map((rule, index) => (
            <div key={index} className="rule-box">
              <strong>{rule.title}</strong>
              <p>{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="discord-buttons">
        <a 
          href="https://discord.gg/98d9dyrYrt"
          target="_blank"
          rel="noopener noreferrer"
          className="join-button"
        >
          Join the Discord Server
        </a>
      </div>
    </div>
  );
}

export default Discord;