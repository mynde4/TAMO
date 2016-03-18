var adntNetsprintVars = 'MVUNQLD7-VAOBUXZ4-Q6S4BII3-6YYAVBPD-ZF6EM9ET-TXJHSFZQ-LAFBMO6D-6S8ICNMI-J9ESJJ2K-HGUNES5R-APBJUCK9-86EMBI7G-0U4PLYBP-OLTVZRSA-YQ67JMYT-Y3MEU1UH-KD8YZWJ5'; 

 var adntGismeteoKws = 'gs_vt4g-gs_vd1g-gs_vk0g-gs_kt5g-gs_kd1g-gs_kk0g-gs_klt5g-gs_kld0g-gs_klk0g-gs_pt2g-gs_pd1g-gs_pk0g'; 

 
if("undefined" === typeof adntKeytargetStep2FinalVariables) var adntKeytargetStep2FinalVariables = "";
adntKeytargetStep2FinalVariables += adntKeytargetFirstStepVars;

adntKeytargetStep2FinalVariables += adntGetAdoceanForCr24Vars();

adntKeytargetStep2FinalVariables += Adntmedia.KeyTarget.AdTargetMe.getVarsIfPresent();

adntKeytargetStep2FinalVariables += Adntmedia.KeyTarget.Adform.getVarsIfPresent();

adntKeytargetStep2FinalVariables += Adntmedia.KeyTarget.Criteo.getVarsIfPresent();

var bburlparam="sociodem=" + adntKeytargetStep2FinalVariables + "&profile=" + adntNetsprintVars + "&meteo=" + adntGismeteoKws;

if(typeof crtg_content !== "undefined") {
    bburlparam+= "&criteo=" + crtg_content;
}

if ("undefined" === typeof bbkeywords) var bbkeywords = "";
bbkeywords+="pbt-emulate-on" + ";" + window.Adntmedia.LimitatorInformer.getKeysIfPresent().join(';') + ';';

if ("undefined" === typeof bbkeywords) var bbkeywords = "";
bbkeywords+="pbt-emulate-on" + ";" + adntTranslateBbeVarsToBbeKwEmulation(adntKeytargetStep2FinalVariables);
