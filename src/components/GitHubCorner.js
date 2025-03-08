import React from 'react';
import githubIcon from '../assets/github-icon.svg';

function GitHubCorner() {
  return (
    <a 
      href="https://github.com/jay-bman725/jaymakesvideos-website"
      target="_blank"
      rel="noopener noreferrer"
      className="github-corner"
      aria-label="View source on GitHub"
    >
      <img src={githubIcon} alt="GitHub" />
    </a>
  );
}

export default GitHubCorner;