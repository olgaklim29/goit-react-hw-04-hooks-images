import Loader from 'react-loader-spinner';

export default function LoaderCircle() {
  return (
    <div className="Loader">
      <Loader type="ThreeDots" color="#303f9f" height={80} width={80} />
    </div>
  );
}