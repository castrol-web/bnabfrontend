const AdminHeader = () => {
  // This would ideally come from auth or a user store
  const user = {
    name: "Admin",
    status: "online", // or "offline"
  };

  return (
    <header className="navbar shadow-sm mb-4 rounded-lg">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{user.name}</span>
        <div className="avatar avatar-online">
          <div className="rounded-full w-10">
            <img alt="admin profile" src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;