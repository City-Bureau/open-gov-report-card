import PropTypes from "prop-types"
import React from "react"
import Micromap from "./micromap"

const BOUNDS = [
  [-1.534841329885356, -0.8097084050562002],
  [-1.527590150179771, -0.800842244754192],
]

const PATH =
  "M10.298816495924257,35.20988427878183L12.25828002570779,28.002464234545187L17.259189000091283,28.682768424972892L21.743781474098796,24.360571656143293L27.46208601888793,28.75288204424578L42.744479011249496,28.280687390681123L45.015997290436644,22.332796408496506L58.54652844904922,27.559856317449885L63.16369878521073,32.96728833579982L54.809954019699944,35.77716410474386L70.07586091282428,39.49169015703956L75.01107803858758,44.20416267411201L82.8350314875861,73.71640881399799L80.2815216894669,78.12607430890057L96.68008382288099,78.15449175004323L103.45347267713805,67.67160941939801L104.0537698597036,54.22034962046018L109.98377814081323,54.850434802880045L142.34514918042987,61.48519150930224L144.6384079013951,41.515481292735785L144.8683460526081,6.989223839394981L162.18653624632861,6.477172260601947L161.93694852790213,35.2921426211542L168.6461779698875,34.13147111211583L180.96533985226415,35.98862904023554L191.17599036186584,29.474307800592214L183.12220371964213,17.55649121699389L201.39698751045216,17.61532870582596L204.928504925163,26.777961599444097L208.35092044585326,23.396130349668965L215.19875512034923,23.4745530718792L214.4829565447435,33.94135232283588L225.55011977670074,40.91260244814475L276.86543665418867,40.77502152661327L277.3841541773727,6.212411125212384L299.85288783727447,5.576183678298548L319.7824460839911,5.807822641079838L315.1307861650421,-7.275957614183426e-12L329.22112742625177,0.1447077167686075L334.34546347521245,17.942057560314424L339.45765940374986,24.8263697386501L338.9786997859337,32.61677920674265L341.73962387474603,39.622297079185955L342.0885718869831,54.856555090904294L347.2127218226087,59.79053210414713L346.5259855918848,69.26703999454912L351.3857262216334,73.42074283115653L351.50658786571876,78.7835632376009L358.3240038607619,89.17724896028813L368.3534672654496,92.12635402080923L356.30499916338886,98.65694720490137L357.90000392030925,109.31009361386532L361.7967648668855,120.13536331685464L358.3555685554893,124.26645908455248L362.3052743104781,132.2148475381182L366.1548041622591,131.3277973225995L370.186504604877,141.99585171957733L370.8239275790402,158.1631870081692L375.09372965544753,170.42499263185164L378.6591091545415,173.5205843486401L376.44416216133686,179.85153270865703L378.3011944679747,188.96303643588908L383.4244133383181,193.68982561224402L389.9780173232575,206.33604537212523L394.1213938415749,201.44106124890095L403.2776616682095,201.19140042657818L403.3650979375234,206.12093259540416L394.5416909506748,206.3094726012132L394.34852867163136,220.6924753871208L387.2508153201634,223.41935783050576L386.9948738478415,244.77470900894696L391.1572038147424,248.17777768790984L396.99101525011065,248.01043841886712L398.35160494601587,269.3370207552289L394.42286768242775,268.4267453421635L395.3869461154245,282.9849114628523L400.765342960658,301.143448398856L409.00312515857513,312.71307541693386L409.66254054267483,318.7694492878363L414.86481570542674,324.92945581417007L423.6735341420426,342.56279077041836L429.7449761375319,348.3123510339283L431.69861411716556,358.59736080868606L430.20458586375753,366.613129226258L434.02948609981104,372.0699623181208L436.3342135947023,386.673345314608L435.8961497165292,392.3702993361512L442.9789280342957,391.37326147352724L449.087275668222,398.2154023291805L452.7810135032778,408.81609054779983L462.53933302266523,417.3898386658984L468.4518813589675,419.37649124747986L472.4592208062095,417.1738259090198L476.29345730096975,421.6176056139593L472.3499244997947,424.8624964087212L476.43171919271117,430.2315782538717L487.1933846457687,435.90054434248304L490.061438603836,461.598672315944L495.09485470716027,463.11064842781343L495.35467864063685,484.7754763877674L490.61129684386833,489.01315380140295L490.7015770960279,495.2187744335606L495.27557117179094,498.89064552464697L494.53092034716974,599.9999999999927L421.68877729678934,599.7714105696796L415.483652263938,593.0993774664166L408.63973445219744,594.4958054307863L408.7075196002115,599.9012941364635L385.80925662000664,599.9353592045954L385.792407161367,590.9391132730234L382.1469808146503,589.9734967455806L385.2259492107114,576.9816581780833L380.12997608981095,572.1988383592106L375.10977634150186,572.9391152895187L369.2270207157417,579.0147011626977L350.64414401391696,579.3126397633387L350.37446958298096,570.5717460131273L357.22005218327104,570.436246991303L356.93174410713254,558.9030277069032L333.9176589090639,559.2262345562049L333.66370067007665,547.8266201332517L304.324623781984,548.3579703240684L304.89534547216317,536.8655668692154L281.63311357056955,537.3210529577555L281.78712550355704,543.0753167159928L274.61267334058357,543.0818382259677L274.4398261823226,537.4692450139919L241.64433569827816,538.0166751651486L241.09912925434764,526.898457552983L264.0355032868829,526.1250975136354L263.08007209547213,491.47398717020405L273.17565255194495,491.27215726034774L274.8930948924244,502.7012249498148L286.4664564640552,502.53586843672383L298.04789508573595,500.91441168935853L297.80054100661073,490.847785843187L309.4783955941093,490.6957666724775L308.6842629101884,456.0931460906504L239.52602270123316,457.6818214077721L238.22905080734927,393.94505737535655L168.96434905804927,395.5333341013975L167.99900243444426,357.1715574157788L173.413913935874,354.86962277512794L225.7437516280188,353.6986810377275L225.3410902452597,332.90436737825075L235.2886032909737,328.7002324359346L235.16038134247356,319.0823735636077L242.57502419683442,318.94281576256617L240.80786154264933,249.4369062237747L200.4646199569106,250.2299866004032L198.73965304229932,180.74820215922227L163.13356298483268,181.40557956182602L162.09637199806457,140.6541692706378L150.56057600551867,140.9695537374355L150.40897615574067,135.21199179574614L111.31187560106628,136.2494770892008L109.1960315778706,133.99603573630884L104.95292875125597,118.91963284826488L106.05353760457365,113.75884644067264L114.86481587259914,113.45610874490376L114.87392065087624,107.02767670238245L101.3217137240863,107.41236953355838L100.61026349166059,103.97527002184506L104.15900481231802,95.6600385435886L105.979789182893,82.43649802582513L96.80581863594125,79.01691159870825L74.51747875082947,79.75743560096453L74.49893963387876,104.62361556817632L60.194827624218306,103.27339162371209L60.220575983286835,114.79872330432408L47.347563777904725,115.07787938093679L34.39027142789564,111.4931187996408L5.186276736931177,105.26866439777223L4.6453213593922555,46.966919810540276ZM125.11259494599653,79.01928467708058L125.09462920030637,82.1528726822944L114.98487112332077,81.29454907544277L114.91451789507119,89.99990817464277L126.59373888470873,89.69790149262553L126.57390527188545,101.19325198663137L131.32320430905384,101.06945997805451L132.36826954752905,112.62289466473158L160.974014787731,111.66428006433125L161.30104388420295,110.21518859930075L176.77342712621612,100.08559404018888L185.5039358335489,99.8323424914488L185.542947220325,86.79109601442906L166.937677341135,86.24130556669843L161.46749240750796,87.04119430835999L161.57298577649635,77.08261239048443ZM292.7312397469068,514.0053063402593L293.03604778589215,525.4145587108724L298.6508421605977,524.5159944910629L298.3802885080513,513.9203975026539Z"

const Chicago = ({ style, points }) => (
  <Micromap style={style} path={PATH} bounds={BOUNDS} points={points} />
)

Chicago.propTypes = {
  style: PropTypes.object,
  points: PropTypes.array,
}

Chicago.defaultProps = {
  style: {},
  points: [],
}

export default Chicago