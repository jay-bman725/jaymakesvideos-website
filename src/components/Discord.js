import React, { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

function Discord({ showConfirmation }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef(null);

  const handleInviteGeneration = async (userId) => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!captchaToken) {
        throw new Error('Please complete the captcha verification');
      }
      
      const response = await fetch(`https://api.jaymakesvideos.xyz/invite/${userId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          captcha_token: captchaToken
        })
      });

      // Reset captcha after use
      setCaptchaToken('');
      captchaRef.current?.resetCaptcha();

      // Handle non-JSON responses (like CORS errors)
      if (!response.ok) {
        if (response.status === 0) {
          throw new Error('Could not connect to the invite service. Please check our status page at https://jaymakesvideos.instatus.com/ for any ongoing issues.');
        }
        const data = await response.json().catch(() => ({ error: 'unknown' }));
        switch (data.error) {
          case 'invalid_format':
            throw new Error('Invalid user ID format. Please enter a valid Discord user ID.');
          case 'invalid_user':
            throw new Error('The provided user ID is not valid.');
          case 'invite_limit_reached':
            throw new Error('You have reached the maximum number of invite links.');
          case 'rate_limited':
            throw new Error('Your IP is being rate limited. Please try again in 24 hours.');
          case 'invalid_captcha':
            throw new Error('Captcha verification failed. Please try again.');
          case 'service_unavailable':
            throw new Error('The invite service is currently unavailable. Please check our status page at https://jaymakesvideos.instatus.com/ for updates.');
          default:
            throw new Error('An error occurred while generating the invite link. Please check our status page at https://jaymakesvideos.instatus.com/ for any ongoing issues.');
        }
      }

      const data = await response.json();

      if (data.is_banned) {
        showConfirmation(
          "You have been banned from the server. We recommend using our ChatGPT ban appeal assistant as it can help you get unbanned more effectively. However, you can also use a Google Form if you prefer.",
          // onConfirm callback - redirect to ChatGPT
          () => {
            window.open('https://chatgpt.com/g/g-68181f0088c8819188b73eb871cc061d-jaymakesvideos-ban-appeal', '_blank', 'noopener,noreferrer');
          },
          // onCancel callback - close popup
          () => {},
          "Use ChatGPT Assistant",
          false,
          '',
          null,
          true,
          "Use Google Form",
          // onThirdButtonClick callback - redirect to Google Form
          () => {
            window.open('https://forms.gle/iBvPsgU5454xwywv6', '_blank', 'noopener,noreferrer');
          }
        );
        return;
      }

      if (!data.invite_link) {
        throw new Error('Could not generate an invite link at this time. Please check our status page at https://jaymakesvideos.instatus.com/ for any ongoing issues.');
      }

      return data.invite_link;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Could not connect to the invite service. Please check our status page at https://jaymakesvideos.instatus.com/ for any ongoing issues.');
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

              if (!captchaToken) {
                setError('Please complete the captcha verification');
                return;
              }

              generatedInviteLink = await handleInviteGeneration(userId.trim());
              
              if (generatedInviteLink) {
                showConfirmation(
                  "You will now be redirected to Discord. Would you like to proceed?",
                  // onConfirm callback - redirect to Discord
                  () => {
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

  const handleCaptchaVerify = (token) => {
    setCaptchaToken(token);
    setError(''); // Clear any previous errors
  };

  const handleCaptchaError = () => {
    setError('Captcha verification failed. Please try again.');
    setCaptchaToken('');
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken('');
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
      <h1>🏳️‍🌈 Join Our Inclusive Discord Community! 🏳️‍🌈</h1>
      
      {/* Pride Month Special Message */}
      <div style={{
        background: 'linear-gradient(45deg, #e60026, #ff8c00, #ffed00, #008026, #004cff, #732982)',
        padding: '1.5rem',
        borderRadius: '15px',
        margin: '1rem 0 2rem 0',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{color: 'white', marginBottom: '1rem'}}>🏳️‍🌈 Safe Space for Everyone 🏳️‍🌈</h2>
        <p style={{margin: 0, fontSize: '1.1rem', fontWeight: 'bold'}}>
          Our Discord is a welcoming space for LGBTQ+ individuals and allies! 
          Everyone is loved, valued, and celebrated here! 💖🌈
        </p>
      </div>
      
      <div className="discord-rules">
        <h2>🌈 Discord Rules - Creating a Safe Space for All</h2>
        <div>
          {Rules.map((rule, index) => (
            <div key={index} className="rule-box pride-flag-border">
              <strong>🌈 {rule.title}</strong>
              <p>{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="discord-buttons">
        {error && <p className="error-message">{error}</p>}
        <div className="captcha-container">
          <HCaptcha
            sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
            onVerify={handleCaptchaVerify}
            onError={handleCaptchaError}
            onExpire={handleCaptchaExpire}
            ref={captchaRef}
          />
        </div>
        <button 
          onClick={handleJoinDiscord}
          className="join-button pride-flag-border"
          disabled={isLoading || !captchaToken}
          style={{
            background: !captchaToken ? 'var(--button-bg)' : 'linear-gradient(45deg, #e60026, #ff8c00, #ffed00, #008026, #004cff, #732982)',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? '🌈 Generating Invite...' : '🏳️‍🌈 Join Our Inclusive Discord Server!'}
        </button>
      </div>
    </div>
  );
}

export default Discord;