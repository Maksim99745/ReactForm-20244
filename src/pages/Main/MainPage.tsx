import styles from './MainPage.module.scss';

export default function MainPage() {
  return (
    <div className={styles.tilesContainer}>
      <a href="/controlled-form">Controlled form with React hook from</a>
      <a href="/uncontrolled-form">Uncontrolled form</a>
    </div>
  );
}
