// import classes from './Subscribe.module.css'

// const Tnc = () => {


 

//   return (
   


//  <div className={classes.container1}>
//       <div className={classes.tnc_container}>
//         <form className={classes.formBox}>
//           <h1 className={classes.heading}>HighFive Games – Terms and Conditions</h1>

//           <div className={classes.section}>
//             <h2>1. Service Description</h2>
//             <p>
//              HighFive is a gaming portal offering a fun and engaging collection of games across different genres. Designed for players of all levels, HighFive delivers exciting challenges and entertainment, with new games regularly added to keep the experience fresh and enjoyable
//             </p>
//           </div>

//           <div className={classes.section}>
//             <h2>2. Subscription Plans and Charges</h2>
//             <p>
//               By subscribing to HighFive Games, you agree to be charged according to the plan you select:
//               <br />Daily Plan: 100 CFA/day
//               <br />Weekly Plan: 300 CFA/week
//               <br />Monthly Plan: 500 CFA/month
//               <br />Your subscription will be automatically renewed at the end of each billing period,
//               and charges will be deducted from your mobile balance accordingly.
//             </p>
//           </div>

//           <div className={classes.section}>
//             <h2>3. Subscription Eligibility</h2>
//             <p>
//               You must be at least 14 years old or have permission from a parent/legal guardian authorized to pay the bill.
//               Service available only to Orange Senegal users with data-enabled smartphones.
//             </p>
//           </div>

//           <div className={classes.section}>
//             <h2>4. Access and Usage</h2>
//             <p>
//               Access is available during your active subscription period. Requires internet connection. Data charges may apply.
//               Content is for personal, non-commercial use.
//             </p>
//           </div>

//           <div className={classes.section}>
//             <h2>5. Unsubscription Policy</h2>
//             <p>
//               You may unsubscribe via the portal or using the SMS/USSD code. Access ends after the billing cycle. No partial refunds.
//             </p>
//           </div>

//           <div className={classes.section}>
//             <h2>6. Auto-Renewal and Billing</h2>
//             <p>
//               Subscriptions renew automatically unless canceled. Ensure enough balance for renewal to avoid service interruption.
//             </p>
//           </div>

//           <div className={classes.section}>
//             <h2>7. Privacy and Data Protection</h2>
//             <p>
//               We respect your privacy. Personal data is handled according to laws and not shared without consent unless required.
//             </p>
//           </div>

//           <div className={classes.section}>
//             <h2>8. Modification of Terms</h2>
//             <p>
//               HighFive Games may update terms at any time. Continued use means acceptance of the updated terms.
//             </p>
//           </div>

//           <div className={classes.section}>
//             <h2>9. Support</h2>
//             <p>
//               For help, contact customer care or visit our support page on the HighFive Games portal.
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Tnc




import classes from './Subscribe.module.css'

const Tnc = () => {
  return (
    <div className={classes.container1}>
      <div className={classes.tnc_container}>
        <form className={classes.formBox}>
          <h1 className={classes.heading}>HighFive Games – Conditions générales</h1>

          <div className={classes.section}>
            <h2>1. Description des services</h2>
            <p>
             HighFive est un portail de jeux proposant une collection de jeux amusants et captivants dans différents genres. Conçu pour les joueurs de tous niveaux, HighFive propose des défis passionnants et divertissants, avec de nouveaux jeux régulièrement ajoutés pour une expérience toujours plus originale et agréable.
            </p>
          </div>

          <div className={classes.section}>
            <h2>2. Plans d'abonnement et frais</h2>
            <ul>
              <li><strong>Plan quotidien :</strong> 100 FCFA/jour</li>
              <li><strong>Forfait hebdomadaire :</strong> 300 FCFA/semaine</li>
              <li><strong>Forfait mensuel :</strong> 500 FCFA/mois</li>
            </ul>
            <p>
              Votre abonnement sera automatiquement renouvelé à la fin de chaque période de facturation et les frais seront déduits de votre solde mobile en conséquence.
            </p>
          </div>

          <div className={classes.section}>
            <h2>3. Admissibilité à l'abonnement</h2>
            <ul>
              <li>Si vous avez moins de 18 ans, vous DEVEZ obtenir l’autorisation de la personne autorisée qui paie votre facture</li>
              <li>Le service est uniquement disponible pour <strong>Orange Sénégal</strong> utilisateurs avec <strong>smartphones compatibles avec les données</strong>.</li>
            </ul>
          </div>

          <div className={classes.section}>
            <h2>4. Accès et utilisation</h2>
            <ul>
              <li>Vous pouvez accéder au portail HighFive pendant votre <strong>période d'abonnement active</strong>.</li>
              <li>Le service nécessite un <strong>connexion Internet active</strong>. Des frais de données peuvent s'appliquer.</li>
              <li>Le contenu est destiné à <strong>personnel, non commercial</strong> utiliser uniquement.</li>
            </ul>
          </div>

          <div className={classes.section}>
            <h2>5. Politique de désabonnement</h2>
            <ul>
              <li>Vous pouvez vous désinscrire via le portail ou en utilisant le code SMS/USSD.</li>
              <li>Access will end after the billing cycle. <strong>L'accès prendra fin après le cycle de facturation.</strong>.</li>
              <li>Désinscription gratuite : #303#10#.</li>
            </ul>
          </div>

          <div className={classes.section}>
            <h2>6. Renouvellement automatique et facturation</h2>
            <ul>
              <li>Les abonnements se renouvellent automatiquement sauf annulation.</li>
              <li>Assurez-vous qu’un solde suffisant est disponible pour éviter une interruption de service.</li>
            </ul>
          </div>

          <div className={classes.section}>
            <h2>7.Confidentialité et protection des données</h2>
            <ul>
              <li>Nous respectons votre vie privée.</li>
              <li>Les données personnelles sont traitées conformément aux lois et ne sont pas partagées sans consentement, sauf si nécessaire..</li>
            </ul>
          </div>

          <div className={classes.section}>
            <h2>8. Modification des Conditions</h2>
            <p>
              HighFive Games peut mettre à jour ses conditions générales à tout moment. L'utilisation continue du site implique l'acceptation des conditions mises à jour.
            </p>
          </div>

          <div className={classes.section}>
            <h2>9. Soutien</h2>
            {/* <p>
              For help, contact customer care or visit our support page on the HighFive Games portal.
            </p> */}
            <p>
  Pour toute question ou assistance, veuillez contacter notre service client ou visiter notre page d'assistance i.e 
  <a className={classes.supportlink} href="mailto:panz.support1@panzcon.com">
    panz.support1@panzcon.com
  </a>.
</p>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Tnc;
