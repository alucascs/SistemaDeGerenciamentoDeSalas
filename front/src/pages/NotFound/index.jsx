import { Link } from 'react-router-dom';
import styles from './notFound.module.css';

function NotFound() {
    return (
        <section className={styles.page_404}>
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="row w-100">
                    <div className="col-12 text-center">
                        <div className={styles.four_zero_four_bg}>
                            <h1 className="text-center" style={{ position: 'relative', top: '-40px' }}>404</h1>
                        </div>
                        <div className={styles.contant_box_404}>
                            <h3 className="h2">Parece que você se perdeu!</h3>
                            <p>A página que você está procurando não está disponível!</p>
                            <Link to="/" className={styles.link_404}>Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} export default NotFound