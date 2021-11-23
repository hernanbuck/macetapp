export default function Button(props) {
  const { url, icon } = props;
  return (
    <div role="button" className="bg-gray-400 w-20 h-20">
      <a href={url} className="flex justify-center w-20 h-20">
        <img
          src={`/img/${icon}.svg`}
          className="self-center w-6 h-6"
          aria-hidden="true"
        ></img>
      </a>
    </div>
  );
}
