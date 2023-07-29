import React ,{useRef,useState} from 'react';
import { IonApp,
   setupIonicReact ,
   IonHeader,
   IonContent,
   IonToolbar,
   IonTitle,
   IonGrid,
   IonRow,
   IonCol,
   IonInput,
   IonItem,
   IonLabel,
   IonCardContent,
   IonAlert
   } from '@ionic/react';
  
   import BmiControl from './components/BmiControl';
   import BmiResult from './components/BmiResult';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBMI,setCalculatedBMI] = useState<number>();
  const [error,setError] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
   const enteredWeight = weightInputRef.current!.value;
   const enteredHeight = heightInputRef.current!.value;
   

   if(!enteredHeight ||
      !enteredWeight || 
      +enteredHeight <=0 || 
      +enteredWeight <=0)
      {
    setError('please enter a valid value')
     
    return;
   }

   const BMI = +enteredWeight / (+enteredHeight * +enteredHeight)
   setCalculatedBMI(BMI)
  }


  const resetInput = () => {
   weightInputRef.current!.value = '';
   heightInputRef.current!.value = '';
   
  }

  const clearError = () => {
    setError('');
  }

  return (
    <React.Fragment>
      <IonAlert isOpen={!!error} message={error} buttons={[{text: 'okay', handler: clearError => {

      } }]}/>

    
  <IonApp>
   <IonHeader>
      <IonToolbar>
        <IonTitle>BMI CALCULATOR</IonTitle>
      </IonToolbar>
   </IonHeader>
   <IonContent className='ion-padding'>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
                <IonLabel position='floating'>Your Height</IonLabel>
                <IonInput type = "number" ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
          <IonItem>
                <IonLabel position='floating'>Your Weight</IonLabel>
                <IonInput type = "number" ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
       

            <BmiControl onCalculate = {calculateBMI} onReset = {resetInput}/>

           {calculatedBMI && (
           <BmiResult result={calculatedBMI}/>
            )}

            </IonGrid>
   </IonContent>
  </IonApp>
  </React.Fragment>
)};

export default App;
 