const UserCard = ({ feed }) => {
  const { firstName, lastName, about, age, gender, photoUrl } = feed;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p className="-mt-2">
            {age}, {gender}
          </p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
