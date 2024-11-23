export function ListenMic() {
  //get access
  const isAccess = true;
  //modal
  if (!isAccess)
    return (
      <div>
        <div>Voice Search has been turned off</div>
        <a>Details</a>
        <div>Mic Disabled Icon</div>
      </div>
    );

  return (
    <div>
      <div>Speak Now</div>
      <div>Mic Icon</div>
    </div>
  );
}
