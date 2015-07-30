<?php
/*
Plugin Name: Overlay content with colorbox 
Plugin URI: http://www.everythingdifferent.co.uk
Description: Plugin for displaying specific external page content element in an overlay
Author: C Lister
Version: 1.0
Author URI: http://www.everythingdifferent.co.uk
*/

function overlaycontent_scripts() {
	wp_enqueue_script( 'overlay-script', '/wp-content/plugins/content-overlay/script.js', array( 'jquery' ), '20150330', true );

	wp_enqueue_style( 'overlay-css', '/wp-content/plugins/content-overlay/styles.css', '1', true );
	wp_enqueue_script( 'colorbox-script', '/wp-content/plugins/content-overlay/jquery.colorbox-min.js', array( 'jquery' ), '20150101', true );
	wp_localize_script("overlay-script", "site",
    	array( "theme_path" => home_url('/'))
    );
};
add_action( 'wp_enqueue_scripts', 'overlaycontent_scripts' );