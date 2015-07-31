<?php
/*
Plugin Name: Overlay content with colorbox 
Plugin URI: http://www.everythingdifferent.co.uk
Description: Plugin for displaying specific external page content element in an overlay
Author: C Lister
Version: 1.0
Author URI: http://www.everythingdifferent.co.uk
*/

// register all hooks
register_activation_hook(__FILE__, 'db_oc_install');
register_deactivation_hook(__FILE__, 'db_oc_uninstall');
// register all hooks

function db_oc_install(){//WHEN PLUGIN ACTIVATES CREATE A TABLE (IF IT DOESN'T ALREADY EXIST)
	global $wpdb;//DATABASE LOGIN DETAILS
	global $oc_db_version;//VERSION CONTROL
	
	// DB Sync tasks table
	$oc_table = $wpdb->prefix."overlaycontent";
	
	$sql = "CREATE TABLE ".$oc_table." (oc_id bigint(20) NOT NULL AUTO_INCREMENT, 
	element_id varchar(20) DEFAULT 'themain' NOT NULL,
	click_class varchar(20) DEFAULT 'overlay-link' NOT NULL,
	UNIQUE KEY oc_id (oc_id)
	)";
	
	require_once(ABSPATH. 'wp-admin/includes/upgrade.php');
	dbDelta($sql);

	$wpdb->insert($oc_table,array('oc_id' => '1'));
	
	add_option("oc_db_version", $oc_db_version);
}

function db_oc_uninstall(){//WHEN PLUGIN DEACTIVATES DROP TABLE (IF IT EXISTS)
	global $wpdb;//DATABASE LOGIN DETAILS
	global $oc_db_version;//VERSION CONTROL
	
	// DB Sync tasks table
	$oc_table = $wpdb->prefix."overlaycontent";
	
	$wpdb->query('DROP TABLE IF EXISTS ' .$oc_table);
}


function overlaycontent_scripts() {
	wp_enqueue_script( 'overlay-script', '/wp-content/plugins/content-overlay/script.js', array( 'jquery' ), '20150330', true );

	wp_enqueue_style( 'overlay-css', '/wp-content/plugins/content-overlay/styles.css', '1', true );
	wp_enqueue_script( 'colorbox-script', '/wp-content/plugins/content-overlay/jquery.colorbox-min.js', array( 'jquery' ), '20150101', true );
	wp_localize_script("overlay-script", "site",
    	array( "theme_path" => home_url('/'))
    );
};

add_action( 'wp_enqueue_scripts', 'overlaycontent_scripts' );

function overlaycontent_admin() {  
	include('content-overlay_import_admin.php');  
}

function overlaycontent_admin_actions() {  
		add_options_page('Overlay Content Settings', 'Overlay Content Settings', 'manage_options', 'overlaycontent_importer', 'overlaycontent_admin');
	
}  

add_action('admin_menu', 'overlaycontent_admin_actions');


function hidden_values() {
    global $wpdb;
    $oc_table = $wpdb->prefix."overlaycontent"; 
    $mylink = $wpdb->get_row("SELECT * FROM $oc_table WHERE oc_id = 1");
    $gettheid = $mylink->element_id;
    $gettheclass = $mylink->click_class;
	echo '<input type="hidden" id="oc_elementid" value="#'.$gettheid.'">';
	echo '<input type="hidden" id="oc_elementclass" value=".'.$gettheclass.'">';
};
add_action('wp_footer', 'hidden_values');