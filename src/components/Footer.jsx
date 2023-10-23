import '../css/Footer.css'

export default function Footer() {
	const d = new Date();
	let year = d.getFullYear();
  return (
	<div>
		<div className="footer">
			<div className="footer-main container">
				<p>&#9400; Copyright {year} Student Nest All Rights Reserved.</p>
			</div>
		</div>
	</div>
  )
}
