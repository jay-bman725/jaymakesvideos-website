import React, { useState } from 'react';

function Discord() {
  const [rulesConfirmed, setRulesConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleConfirmRules = () => {
    const userConfirmed = window.confirm('Do you confirm that you understand and accept our Discord rules?');
    if (userConfirmed) {
      setRulesConfirmed(true);
      setShowError(false);
    } else {
      window.location.href = '/404';
    }
  };

  const handleJoinAttempt = () => {
    if (!rulesConfirmed) {
      setShowError(true);
      return;
    }
  };

  const Rules = [
    {
      title: "Be Kind and Respectful",
      description: (
        <>
          • Treat everyone with respect - we're all here to have a good time! 😊<br />
          • No hate speech, bullying, or harassment of any kind<br />
          • Keep discussions friendly - it's okay to disagree, just be nice about it
        </>
      )
    },
    {
      title: "Keep the Chat Clean",
      description: (
        <>
          • Don't spam messages or reactions - it makes the chat hard to read<br />
          • Stay on topic in each channel<br />
          • No bots or automated messages without permission
        </>
      )
    },
    {
      title: "Keep it Family-Friendly",
      description: (
        <>
          • No adult content (NSFW) or explicit material<br />
          • Swearing is allowed in general conversation, but not when directed at others. Keep it appropriate for all ages.<br />
          • Think twice before posting memes or jokes - make sure they're appropriate
        </>
      )
    },
    {
      title: "No Self-Promotion",
      description: (
        <>
          • Ask staff before sharing any links or advertisements<br />
          • This includes your own social media, videos, or streams<br />
          • We want organic conversations, not promotional content
        </>
      )
    },
    {
      title: "Protect Privacy",
      description: (
        <>
          • Never share someone's personal info without their permission<br />
          • Keep private messages private - don't share screenshots<br />
          • Respect everyone's right to privacy
        </>
      )
    },
    {
      title: "Follow the Rules",
      description: (
        <>
          • Follow Discord's official rules and guidelines<br />
          • Use channels for their intended purpose<br />
          • Don't try to find loopholes in the rules
        </>
      )
    },
    {
      title: "Be Honest",
      description: (
        <>
          • Don't pretend to be someone else<br />
          • Use an appropriate username and profile picture<br />
          • Be yourself!
        </>
      )
    },
    {
      title: "Listen to Staff",
      description: (
        <>
          • Staff are here to help keep the server friendly and safe<br />
          • Follow staff instructions when given<br />
          • If you have concerns, talk to staff privately
        </>
      )
    },
    {
      title: "Report Problems",
      description: (
        <>
          • See someone breaking rules? Let staff know privately<br />
          • Use support tickets for reporting issues<br />
          • Don't start drama - let staff handle problems
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
          {Rules.map((rule, index) => (
            <div key={index} className="rule-box">
              <strong>{rule.title}</strong>
              <p>{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="discord-buttons">
        {rulesConfirmed ? (
          <a 
            href="https://discord.gg/98d9dyrYrt"
            target="_blank"
            rel="noopener noreferrer"
            className="join-button"
          >
            Join the Discord Server
          </a>
        ) : (
          <button 
            onClick={handleConfirmRules}
            className="join-button"
          >
            I Understand and Accept the Rules
          </button>
        )}
        {showError && (
          <div className="error-message">
            Please read and confirm that you understand the rules before joining.
          </div>
        )}
      </div>
    </div>
  );
}

export default Discord;