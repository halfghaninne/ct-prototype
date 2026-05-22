import styles from './ui.module.css'

export default function About() {
    return (
        <div className={styles.center}>
            <div className={`${styles.aboutIntro} ${styles.paraSpacing}`}>
                <p className={`${styles.about1}`} id='about1'>What would it mean for diasporic communities to learn from our own textual histories through acts of communal translation?</p>
                
                <p className={styles.about2} id='about2'>How can we apply and extend these translation practices as a means of moving beyond the static nature of the digital archive, and creating new forms of knowledge?</p>
                    
                <p className={styles.about3} id='about3'>Following diaspora studies scholar Ipek Demir,<sup>1</sup> what does it mean for the agency of the archival subject — particularly the kind of dual-subject of the diasporic viewer — to be able to translate, interpret, and annotate archival materials in-place, to make meaning against the archival grain?</p>
            </div>

            <div className={styles.paraSpacing}>

            <p>Many existing software translation tools are primarily concerned with translation at scale<sup>2</sup> — translating many texts or into many languages,<sup>3</sup> or crowdsourcing translations,<sup>4</sup> or building translational memory<sup>5</sup> over many different translations.</p>
            
            <p>This project differs fundamentally in that it is as equally concerned with the <em>process</em> of translation as it is with the product of that translation. The project centers on a theory of the political and pedagogical uses of communal translation, largely inspired by The Palestinian Youth Movement's translation of <em>The Trinity of Fundamentals</em>.<sup>6</sup></p>
            
            <p>The project aims to create a place for groups to work and decide on translations together; a place where the process of translation is its own important text that the groups communally owns and can learn from. Over time, communities can build their own translation dictionaries, complete with contextual references to original source documents and conversation threads about translation decisions.</p>

            <p>This project was conceived over the course of my graduate studies in CL89400 Introduction to Translation and DHUM78000 Digital Memories. Initially imagined as a customization of cultural management system, Dédalo,<sup>7</sup> I've instead opted to build the platform from scratch. While this has delayed development and deployment of the platform significantly, it also allows me to make more customizations at every step of the software development process, like making security-minded decisions for the content data layer and designing the software to allow for maximal amounts of user data sovereignty.<sup>8</sup></p>

            <p>Prototype fidelity is expected by early summer 2026, with an alpha release planned for winter 2026 as part of my culminating capstone work for my CUNY Digital Humanities Masters of Arts requirements.</p>
            </div>

            <div className={styles.citations}>
                <ol>
                    <li>Ipek, Demir. <em>Diaspora as translation and decolonization</em> (Manchester University Press, 2022).</li>
                    <li><a href="https://phrase.com/platform/tms/" target="_blank">Phrase TMS: The Leading Translation Management System.</a></li>
                    <li><a href="https://tatoeba.org/en/" target="_blank">Tatobea: Collection of sentences and translations.</a></li>
                    <li><a href="https://translatingcuba.com/" target="_blank">Translating Cuba: English Translations of Cubans Writing From the Island</a></li>
                    <li><a href="https://omegat.org/" target="_blank">OmegaT: The Free Translation Memory Tool</a></li>
                    <li>Awwad, Dalia, Kaleem Hawa, and Danya Al-Saleh. <a href="https://www.thenation.com/article/culture/wissam-rafeedie-interview-trinity-of-fundamentals/" target="_blank">“Bringing a Seminal Palestinian Resistance Novel to the World”</a>. Interview by Rayan El Amine, <em>The Nation</em>, April 19, 2024.</li>
                    <li><a href="https://dedalo.dev/" target="_blank">Dédalo: Cultural Heritage Management System</a></li>
                    <li><a href="https://www.backblaze.com/cloud-storage/security" target="_blank">Backblaze: Cloud Storage Built for Data Security</a></li>
                </ol>
            </div>
            <div style={{height: '150px'}}/>
        </div>
    )
}