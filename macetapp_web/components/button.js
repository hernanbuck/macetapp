export default function Button(props) {
  const { url, icon, onClick, disable, className = "", classLink = "" } = props;

  let disableBtn = disable ? 'cursor-not-allowed hover:bg-red-400' : ''
  return (
    <div role="button" className={`flex justify-center self-end bg-gray-400 hsover:bg-green-600 w-24 h-24 mr-4  ${disableBtn} xs:visible ${className}`}>
      <a onClick={disable ? () => { } : onClick} href={url} className={`flex text-center self-center rounded-full h ${classLink}`}>
        <img
          src={`/img/${icon}.svg`}
          className="self-center w-6 h-6"
          aria-hidden="true"
        ></img>
      </a>
    </div>
  );
}
