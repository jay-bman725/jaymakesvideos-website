import React, { useState } from 'react';

function Discord({ showConfirmation }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteGeneration = async (userId) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`http://localhost:4000/invite/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include'
      });

      // Handle non-JSON responses (like CORS errors)
      if (!response.ok) {
        if (response.status === 0) {
          throw new Error('Could not connect to the invite service. CORS error - please check if the server is running and CORS is enabled.');
        }
        const data = await response.json().catch(() => ({ error: 'unknown' }));
        switch (data.error) {
          case 'invalid_format':
            throw new Error('Invalid user ID format. Please enter a valid Discord user ID.');
          case 'invalid_user':
            throw new Error('The provided user ID is not valid.');
          case 'invite_limit_reached':
            throw new Error('You have reached the maximum number of invite links.');
          default:
            throw new Error('An error occurred while generating the invite link.');
        }
      }

      const data = await response.json();

      if (data.is_banned) {
        throw new Error('Sorry, you are not allowed to join this server.');
      }

      if (!data.invite_link) {
        throw new Error('Could not generate an invite link at this time.');
      }

      return data.invite_link;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Could not connect to the invite service. Please check if the server is running.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinDiscord = () => {
    let userId = '';
    let generatedInviteLink = '';

    showConfirmation(
      "Do you confirm that you understand and accept our Discord rules?",
      // onConfirm callback - show user ID input
      () => {
        showConfirmation(
          "Please enter your Discord User ID:",
          // onConfirm callback - generate invite
          async () => {
            try {
              if (!userId.trim()) {
                setError('Please enter your Discord User ID');
                return;
              }

              generatedInviteLink = await handleInviteGeneration(userId.trim());
              
              if (generatedInviteLink) {
                showConfirmation(
                  "You will now be redirected to Discord. Would you like to proceed?",
                  // onConfirm callback - redirect to Discord
                  () => {
                    // Use the actual invite link from the API
                    window.open(`https://discord.gg/${generatedInviteLink}`, '_blank', 'noopener,noreferrer');
                  },
                  // onCancel callback - do nothing, stay on current page
                  () => {}
                );
              }
            } catch (error) {
              setError(error.message);
              // Don't refresh the page, just show the error
            }
          },
          // onCancel callback - just clear the error if any
          () => {
            setError('');
          },
          "Continue",
          true,
          userId,
          (value) => {
            userId = value;
          }
        );
      },
      // onCancel callback - just clear the error if any
      () => {
        setError('');
      }
    );
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
        {error && <p className="error-message">{error}</p>}
        <button 
          onClick={handleJoinDiscord}
          className="join-button"
          disabled={isLoading}
        >
          {isLoading ? 'Generating Invite...' : 'Join Discord Server'}
        </button>
      </div>
    </div>
  );
}

export default Discord;