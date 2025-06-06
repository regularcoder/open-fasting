export const Info = () => {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1>About Intermittent Fasting</h1>
            </div>
            <div className="info-content">
                <div className="info-section">
                    <h3>What is Intermittent Fasting?</h3>
                    <p>
                        Intermittent fasting is an eating pattern that cycles between periods of fasting and eating. 
                        It's not about what you eat, but when you eat.
                    </p>
                </div>

                <div className="info-section">
                    <h3>Popular Methods</h3>
                    <div className="method-card">
                        <h4>16:8 Method</h4>
                        <p>Fast for 16 hours, eat during 8 hours</p>
                    </div>
                    <div className="method-card">
                        <h4>18:6 Method</h4>
                        <p>Fast for 18 hours, eat during 6 hours</p>
                    </div>
                    <div className="method-card">
                        <h4>OMAD (One Meal A Day)</h4>
                        <p>Fast for 23 hours, eat one meal</p>
                    </div>
                </div>

                <div className="info-section">
                    <h3>Potential Benefits</h3>
                    <ul className="benefits-list">
                        <li>Weight management</li>
                        <li>Improved metabolic health</li>
                        <li>Enhanced mental clarity</li>
                        <li>Better sleep patterns</li>
                    </ul>
                </div>

                <div className="info-section">
                    <h3>Important Note</h3>
                    <p className="disclaimer">
                        Always consult with a healthcare professional before starting any fasting regimen, 
                        especially if you have existing health conditions.
                    </p>
                </div>
            </div>
        </div>
    )
}