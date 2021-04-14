import React, { useEffect, useState } from "react";
import Channel from "../Channel/Channel";
import "./ChannelList.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
const ChannelList = ({ chatClient, setActiveChannel }) => {
  const [channelList, setChannelList] = useState([]);
  const [newChannelName, setNewChannelName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [channelType, setChannelType] = useState("");
  //Populates channelList
  useEffect(() => {
    const filter = { type: "messaging" };
    // const filter = { members: { $in: [chatClient.userID] } };
    const sort = [{ last_message_at: -1 }];
    const options = { limit: 8 };
    const getChannels = async () => {
      await chatClient
        .queryChannels(filter, sort, options)
        .then((r) => setChannelList(r));
    };
    getChannels();
    chatClient.queryChannels();
    // .then((r) => console.log(r));
  }, [chatClient]);

  //Updates on events
  const updateChannelList = (channelType, channelID, action) => {
    if (action === "add") {
      setChannelList([
        ...channelList,
        chatClient.channel(channelType, channelID),
      ]);
    }
    if (action === "delete") {
      setChannelList(channelList.filter((channel) => channel.id !== channelID));
    }
  };

  chatClient.on("notification.added_to_channel", (e) =>
    updateChannelList(e.channel.type, e.channel.id, "add")
  );
  chatClient.on("notification.message_new", (e) =>
    updateChannelList(e.channel.type, e.channel.id, "add").then((r) =>
      console.log(r, "-new-message")
    )
  );
  chatClient.on("notification.channel_deleted", (e) =>
    updateChannelList(e.channel.type, e.channel.id, "delete")
  );
  chatClient.on("channel.deleted", (e) =>
    updateChannelList(e.channel.type, e.channel.id, "delete")
  );

  //set limits
  const createChannel = async (e) => {
    e.preventDefault();
    setModalOpen(false);
    const channel = chatClient.channel(channelType, newChannelName, {
      members: [chatClient.userID],
      name: "This channel was created client-side",
      created_by: { id: chatClient.userID },
    });
    await channel.watch();
  };

  const deleteChannel = (channelType, channelid) => {
    const channel = chatClient.channel(channelType, channelid);
    channel.delete();
  };

  const renderChannelComponent = () => {
    if (channelList.length) {
      return channelList.map((channel) => {
        return (
          <Channel
            channelName={channel.id}
            channelType={channel.type}
            deleteChannel={deleteChannel}
            messages={channel.state.messages}
            setActiveChannel={setActiveChannel}
            key={channel.id}
            channel={channel}
            chatClient={chatClient}
          />
        );
      });
    }
    return "Loading";
  };

  //Modal Stuff... Ignore
  function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      fontFamily: "Helvetica",
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  const body = (
    <div style={getModalStyle()} className={classes.paper}>
      <h2>Create A Channel</h2>
      <form className="create-channel-form">
        <label
          onChange={(e) => setChannelType(e.target.value)}
          for="Channel Name"
        >
          Channel Name (only A-Z chars, '-', and '_' are allowed):
        </label>
        <input
          type="text"
          onChange={(e) => setNewChannelName(e.target.value)}
        />
        <label for="channel type">Channel Type</label>
        <select
          name="channel type"
          onChange={(e) => setChannelType(e.target.value)}
        >
          Channel Type
          <option value="messaging">Select A Channel Type</option>
          <option value="messaging">Messaging (Click to Join)</option>
          <option value="livestream">Livestream (Public)</option>
        </select>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => createChannel(e)}
        >
          Create Channel
        </Button>
      </form>
    </div>
  );
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="channel-list-container">
      <div className="channel-list">
        <h4 className="channel-list_header">All Channels</h4>
        {renderChannelComponent()}
      </div>
      <div className="create-channel-area">
        <button onClick={handleOpen} className="create-channel">
          Create New Channel
        </button>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </div>
  );
};

export default ChannelList;
