function isModifiedEvent(evt: React.MouseEvent) {
  return !!(evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey);
}

export function SmartLink(props: React.PropsWithChildren<{
  title?: string;
  href: string;
  onClick(): void;
}>) {
  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    // https://stackoverflow.com/a/57040157
    const isInternal = (
      !evt.defaultPrevented && // onClick prevented default
      evt.button === 0 && // ignore everything but left clicks
      // (!target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(evt) // ignore clicks with modifier keys
    )
    if (isInternal) {
      evt.preventDefault();
      props.onClick();
    } else {
      // do nothing, anchor tag will handle it
    }
  }
  return (
    <a
      href={props.href}
      onClick={evt => handleClick(evt)}
    >
      {props.children}
    </a>
  );
}
