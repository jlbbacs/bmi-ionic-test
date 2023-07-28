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
   IonCardContent
   } from '@ionic/react';
  
   import BmiControl from './components/BmiControl';


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

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
   const enteredWeight = weightInputRef.current!.value;
   const enteredHeight = heightInputRef.current!.value;
   

   if(!enteredHeight || !enteredWeight){
    alert('enter a number')
    return;
   }

   const BMI = +enteredWeight / (+enteredHeight * +enteredHeight)
   setCalculatedBMI(BMI)
  }


  const resetInput = () => {
   weightInputRef.current!.value = '';
   heightInputRef.current!.value = '';
   
  }
  return (
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
                <IonInput ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
          <IonItem>
                <IonLabel position='floating'>Your Weight</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
       

            <IonRow>
              <IonCol>

              </IonCol>
            </IonRow>

            <BmiControl onCalculate = {calculateBMI} onReset = {resetInput}/>

           {calculatedBMI && (<IonRow>
              <IonCol>
                  <IonCardContent>
                      <h2>{calculatedBMI.toFixed(2)}</h2>
                  </IonCardContent>
              </IonCol>
            </IonRow>
            )}

            </IonGrid>
   </IonContent>
  </IonApp>
)};

export default App;
 