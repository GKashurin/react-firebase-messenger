import React from "react";

const User = ({user, onClick}) => {

	return (
		<div onClick={() => onClick(user)} className="displayName">
			<div className="displayPic">
				<img src="https://klike.net/uploads/posts/2019-07/1564314059_1.jpg" alt="avatar" />
			</div>
			<div style={{
				display:'flex',
				flex: 1,
				justifyContent: 'space-between',
				margin: '0 10px'
			}}>
				<span style={{fontWeight: 500}}>{user.firstName} {user.secondName}</span>
				<span className={user.isOnline ? 'onlineStatus' : 'onlineStatus off'}></span>
			</div>
		</div>
	)
}
export default User