import React from 'react'

export default function Header({ chatClient, channel, res }) {
  console.log(channel)
  return (
    <div className="Header">
      {res ? (
          // `${chatClient.user.id}`
          res.channel.id
      ) : (
        ""
      )}
    </div>
  );
};
