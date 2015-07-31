
<?php 
    global $wpdb;
    $oc_table = $wpdb->prefix."overlaycontent"; 
    $mylink = $wpdb->get_row("SELECT * FROM $oc_table WHERE oc_id = 1");
    $gettheid = $mylink->element_id;
    $gettheclass = $mylink->click_class;


    $a_value = isset($_POST['overlaycontent_hidden']) ? $_POST['overlaycontent_hidden'] : '';
    if($a_value == 'Y') {  
        //Form data sent  
        $elementid = $_POST['overlaycontent_dbhost'];  
        $gettheid = $elementid;
        update_option('overlaycontent_dbhost', $elementid);  
          
        $clickclass = $_POST['overlaycontent_dbname'];  
        $gettheclass = $clickclass;
        update_option('overlaycontent_dbname', $clickclass);  

        $wpdb->replace( 
          $oc_table, 
          array( 
            'oc_id' => 1,
            'element_id' => $elementid, 
            'click_class' => $clickclass 
          ), 
          array( 
             '%d',
            '%s', 
            '%s' 
          ) 
        );

        ?>  
        <div class="updated"><p><strong><?php _e('Options saved.' ); ?></strong></p></div>  
        <?php  
    } else {  
        //Normal page display  

    }  
?>  
    <div class="wrap">  
    <?php    echo "<h2>" . __( 'Overlay Content Settings', 'overlaycontent_trdom' ) . "</h2>"; ?>  
      
    <form name="overlaycontent_form" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">  
        <input type="hidden" name="overlaycontent_hidden" value="Y">  
        <?php    echo "<h4>" . __( 'Element Settings', 'overlaycontent_trdom' ) . "</h4>"; ?>  
        <p><?php _e("Choose the element ID of the content you want to retrieve and display in an overlay #" ); ?><input type="text" name="overlaycontent_dbhost" value="<?php echo $gettheid; ?>" size="20"></p>

        <p><?php _e("Class for link that opens content in an overlay ." ); ?><input type="text" name="overlaycontent_dbname" value="<?php echo $gettheclass; ?>" size="20"></p>  

        <p class="submit">  
        <input type="submit" name="Submit" value="<?php _e('Update Options', 'overlaycontent_trdom' ) ?>" />  
        </p>  
    </form>  
</div> 