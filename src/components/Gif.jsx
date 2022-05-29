export function Gif(props) {
  function addGifToConversation(gif) {
    const hasConversationOpened = Missive.state.conversations?.length > 0;
    if (!hasConversationOpened)
      Missive.createConversation({ select: true, count: 1 });

    Missive.comment(props.gif.images.downsized.url);
  }

  return (
    <img
      className="gif"
      src={props.gif.images.preview_gif.url}
      onClick={(e) => addGifToConversation(props.gif)}
    />
  );
}
