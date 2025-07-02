const AdminFooter = () => {
    return (
        <footer className="footer footer-center p-4 mt-6 text-slate-400 rounded">
            <p>© {new Date().getFullYear()} BnB Admin Panel. All rights reserved.</p>
        </footer>
    );
};

export default AdminFooter;