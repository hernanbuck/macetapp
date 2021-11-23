export default function Button(props) {
  const { url, icon, onClick } = props;
  return (
    <div role="button" className="flex justify-center align-center bg-gray-400 w-24 h-24 mr-4 hover:bg-green-600">
      <a onClick={onClick} href={url} className="flex justify-center self-center">
        <img
          src={`/img/${icon}.svg`}
          className="self-center w-6 h-6"
          aria-hidden="true"
        ></img>
      </a>
    </div>
  );
}
